#!/usr/bin/env node
/**
 * Testes de regressão de segurança do issue-to-post.mjs.
 * Rode com: npm test  (node --test scripts/issue-to-post.test.mjs)
 *
 * Cobre as brechas já corrigidas:
 * - imagem .svg nunca é salva com extensão executável
 * - data de calendário inválida cai no fallback
 * - tags hostis não quebram o YAML gerado
 * - cover com aspas é serializado com segurança
 * - slug não permite path traversal
 *
 * IMPORTANTE: usar execFile assíncrono (não execFileSync) — o servidor HTTP
 * local roda no mesmo processo e o sync bloquearia o event loop (deadlock).
 */
import { test, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import fs from 'node:fs'
import http from 'node:http'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const execFileAsync = promisify(execFile)
const scriptPath = fileURLToPath(new URL('./issue-to-post.mjs', import.meta.url))
const tempDirs = []
let server
let baseUrl

before(async () => {
  // Servidor local serve um SVG "malicioso" para o teste de download.
  server = http.createServer((_req, res) => {
    res.setHeader('Content-Type', 'image/svg+xml')
    res.setHeader('Connection', 'close')
    res.end('<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>')
  })
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  baseUrl = `http://127.0.0.1:${server.address().port}`
})

after(() => {
  server.closeAllConnections?.()
  server.close()
  for (const dir of tempDirs) {
    fs.rmSync(dir, { recursive: true, force: true })
  }
})

async function runIssue(body, title = 'Post de teste') {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'issue-to-post-test-'))
  tempDirs.push(dir)
  await execFileAsync(process.execPath, [scriptPath], {
    cwd: dir,
    env: { ...process.env, ISSUE_TITLE: title, ISSUE_BODY: body, ISSUE_NUMBER: '42' },
    encoding: 'utf8',
  })
  return dir
}

function readPost(dir) {
  const files = fs.readdirSync(path.join(dir, 'src/content/blog'))
  assert.equal(files.length, 1, `esperava 1 post, veio: ${files.join(', ')}`)
  return { name: files[0], content: fs.readFileSync(path.join(dir, 'src/content/blog', files[0]), 'utf8') }
}

test('imagem .svg é salva como .png (não executável no origin)', async () => {
  const dir = await runIssue(
    `---\nslug: teste-svg\n---\n\nCorpo do post com mais de vinte caracteres.\n\n![x](${baseUrl}/evil.svg)\n`,
  )
  const assetDir = path.join(dir, 'public/blog/teste-svg')
  const files = fs.readdirSync(assetDir)
  assert.deepEqual(files, ['img-01.png'], 'não pode existir arquivo .svg em public/blog')
})

test('data válida de calendário é mantida', async () => {
  const dir = await runIssue('---\ndate: 2026-12-25\n---\n\nCorpo do post com mais de vinte caracteres.\n')
  const { content } = readPost(dir)
  assert.match(content, /^date: 2026-12-25$/m)
})

test('data de calendário inválida cai no fallback (hoje)', async () => {
  const today = new Date().toISOString().slice(0, 10)
  for (const bad of ['2026-02-31', '2026-13-99', '2026-4-5', 'not-a-date']) {
    const dir = await runIssue(`---\ndate: ${bad}\n---\n\nCorpo do post com mais de vinte caracteres.\n`)
    const { content } = readPost(dir)
    assert.match(content, /^date: \d{4}-\d{2}-\d{2}$/m, `date inválida aceita: ${bad}`)
    assert.ok(!content.includes(`date: ${bad}`), `data inválida passou pelo filtro: ${bad}`)
    assert.match(content, new RegExp(`^date: ${today}$`, 'm'), `fallback diferente de hoje para: ${bad}`)
  }
})

test('tags hostis não quebram o YAML gerado', async () => {
  const dir = await runIssue(
    '---\ntags: vip, "quebra]: yml, <script>alert(1)</script>\n---\n\nCorpo do post com mais de vinte caracteres.\n',
  )
  const { content } = readPost(dir)
  const tagsLine = content.match(/^tags: .*$/m)?.[0]
  assert.ok(tagsLine, 'linha de tags ausente')
  assert.match(tagsLine, /^tags: \[[^\]"<>]*\]$/, `tags inseguras: ${tagsLine}`)
})

test('cover com aspas é serializado como string YAML segura', async () => {
  const dir = await runIssue('---\ncover: /blog/x.png"hostil\n---\n\nCorpo do post com mais de vinte caracteres.\n')
  const { content } = readPost(dir)
  const coverLine = content.match(/^cover: .*$/m)?.[0]
  assert.ok(coverLine, 'linha cover ausente')
  assert.match(coverLine, /^cover: "/, `cover não citado: ${coverLine}`)
})

test('slug malicioso não escapa do diretório do blog', async () => {
  const dir = await runIssue(
    '---\nslug: ../../evil\n---\n\nCorpo do post com mais de vinte caracteres.\n',
    '../../Fora do blog',
  )
  const { name } = readPost(dir)
  assert.ok(!name.includes('/') && !name.includes('..'), `slug perigoso: ${name}`)
  assert.ok(
    fs.existsSync(path.join(dir, 'src/content/blog', name)),
    'post deve ficar dentro de src/content/blog',
  )
})
