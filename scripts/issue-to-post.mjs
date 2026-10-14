#!/usr/bin/env node
/**
 * Converte uma GitHub Issue em post do blog.
 * Entrada via env: ISSUE_TITLE, ISSUE_BODY, ISSUE_NUMBER
 * Saída: src/content/blog/<slug>.md + imagens em public/blog/<slug>/
 */
import fs from 'node:fs'
import path from 'node:path'

const title = process.env.ISSUE_TITLE?.trim() || 'Sem título'
const body = process.env.ISSUE_BODY || ''
const number = process.env.ISSUE_NUMBER || '0'

function slugify(input) {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || `post-${number}`
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, body: raw }

  const data = {}
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    data[key] = value
  }
  return { data, body: match[2] }
}

function firstParagraph(text) {
  const cleaned = text
    .replace(/^---[\s\S]*?---/, '')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_>`]/g, '')
    .trim()
  const para = cleaned.split(/\n{2,}/).find((block) => block.trim().length > 20)
  return (para || cleaned).replace(/\s+/g, ' ').slice(0, 180).trim()
}

const { data, body: contentRaw } = parseFrontmatter(body)
const slug = slugify(data.slug || title)
const date = data.date || new Date().toISOString().slice(0, 10)
const tags = data.tags || 'blog'
const excerpt = data.excerpt || firstParagraph(contentRaw)

const slugDir = path.join('public', 'blog', slug)
const postDir = path.join('src', 'content', 'blog')
fs.mkdirSync(slugDir, { recursive: true })
fs.mkdirSync(postDir, { recursive: true })

// Baixa imagens hospedadas no GitHub e reescreve o Markdown
const imgRegex = /!\[([^\]]*)\]\((https?:\/\/[^)\s]+)\)/g
const downloads = []
let content = contentRaw
let imageIndex = 0
let match

const assetsDir = `blog/${slug}`

async function downloadImage(url, index) {
  const extGuess = (url.split('?')[0].match(/\.(png|jpe?g|gif|webp|svg)$/i) || [])[1] || 'png'
  const filename = `img-${String(index + 1).padStart(2, '0')}.${extGuess.toLowerCase()}`
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'filipestudio-blog-bot',
      Accept: 'image/*',
    },
  })
  if (!res.ok) {
    console.error(`Falha ao baixar imagem (${res.status}): ${url}`)
    return null
  }
  const buf = Buffer.from(await res.arrayBuffer())
  fs.writeFileSync(path.join(slugDir, filename), buf)
  console.log(`imagem salva: ${assetsDir}/${filename}`)
  return `/${assetsDir}/${filename}`
}

while ((match = imgRegex.exec(contentRaw)) !== null) {
  downloads.push({ alt: match[1], url: match[2], index: imageIndex })
  imageIndex += 1
}

for (const item of downloads) {
  const localPath = await downloadImage(item.url, item.index)
  if (localPath) {
    content = content.replace(
      `![${item.alt}](${item.url})`,
      `![${item.alt}](${localPath})`,
    )
  }
}

// Capa: se não houver cover explícita, usa a primeira imagem baixada
let cover = data.cover
if (!cover && downloads.length > 0) {
  cover = `/${assetsDir}/img-01.png`
}
// melhor palpite de extensão da primeira imagem
if (!data.cover && downloads.length > 0) {
  const first = downloads[0]
  const files = fs.readdirSync(slugDir)
  const firstFile = files.find((f) => f.startsWith('img-01.'))
  if (firstFile) cover = `/${assetsDir}/${firstFile}`
  void first
}

const frontmatter = [
  '---',
  `title: ${JSON.stringify(title)}`,
  `date: ${date}`,
  `excerpt: ${JSON.stringify(excerpt)}`,
  cover ? `cover: ${cover}` : null,
  `tags: [${tags
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
    .join(', ')}]`,
  `slug: ${slug}`,
  '---',
  '',
]
  .filter((line) => line !== null)
  .join('\n')

const markdown = `${frontmatter}\n${content.trim()}\n`
const postPath = path.join(postDir, `${slug}.md`)
fs.writeFileSync(postPath, markdown, 'utf8')
console.log(`post gerado: ${postPath}`)
console.log(`SLUG=${slug}`)
