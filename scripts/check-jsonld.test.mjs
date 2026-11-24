#!/usr/bin/env node
/**
 * Sincronia FAQS (src/data/content.ts) × FAQPage JSON-LD (index.html) — FS-011.5.
 * Rode com: npm test  (node --test scripts/*.test.mjs)
 *
 * Protege o ativo de SEO contra divergência silenciosa:
 * - os 6 itens de `FAQS` batem palavra a palavra com o `FAQPage` do index.html
 *   (name = question, acceptedAnswer.text = answer, na mesma ordem);
 * - `priceRange` do `ProfessionalService` continua "R$ 2.490+".
 *
 * IMPORTANTE: o teste SÓ LÊ `src/data/content.ts` (parse do literal) — nunca
 * escreve no arquivo. Não introduzir Vitest/Jest (plano §7.3).
 */
import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const contentSource = fs.readFileSync(path.join(root, 'src/data/content.ts'), 'utf8')
const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8')

const EXPECTED_FAQ_COUNT = 6
const EXPECTED_PRICE_RANGE = 'R$ 2.490+'

function unescapeTsString(raw) {
  return raw.replace(/\\(['\\])/g, '$1')
}

/**
 * Extrai o array literal de `export const FAQS` de content.ts por parse de
 * texto (sem executar/importar TS). Cada item tem shape
 * `{ id: '...', question: '...', answer: '...' }` com strings simples.
 */
function parseFaqs(source) {
  const start = source.indexOf('export const FAQS')
  assert.ok(start !== -1, 'content.ts deve exportar FAQS')
  const slice = source.slice(start)
  const open = slice.indexOf('[')
  const close = slice.indexOf('\n]')
  assert.ok(open !== -1 && close !== -1 && close > open, 'FAQS deve ser um array literal')

  const block = slice.slice(open, close + 2)
  const itemRe = /\{\s*id:\s*'([^']+)',\s*question:\s*'((?:[^'\\]|\\.)*)',\s*answer:\s*\n?\s*'((?:[^'\\]|\\.)*)',?\s*\}/g
  const items = []
  for (const match of block.matchAll(itemRe)) {
    items.push({
      id: match[1],
      question: unescapeTsString(match[2]),
      answer: unescapeTsString(match[3]),
    })
  }
  return items
}

/** Todos os blocos JSON-LD do <head>, parseados. */
function parseJsonLd(html) {
  const blocks = []
  const scriptRe = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g
  for (const match of html.matchAll(scriptRe)) {
    blocks.push(JSON.parse(match[1]))
  }
  return blocks
}

const faqs = parseFaqs(contentSource)
const jsonLd = parseJsonLd(indexHtml)
const faqPage = jsonLd.find((block) => block['@type'] === 'FAQPage')
const professional = jsonLd.find((block) => block['@type'] === 'ProfessionalService')

test('index.html tem FAQPage e ProfessionalService parseáveis', () => {
  assert.ok(faqPage, 'FAQPage JSON-LD ausente do index.html')
  assert.ok(professional, 'ProfessionalService JSON-LD ausente do index.html')
  assert.ok(Array.isArray(faqPage.mainEntity), 'FAQPage.mainEntity deve ser array')
})

test(`content.ts mantém os ${EXPECTED_FAQ_COUNT} FAQS exatos (fonte do JSON-LD)`, () => {
  assert.equal(faqs.length, EXPECTED_FAQ_COUNT, `esperava ${EXPECTED_FAQ_COUNT} FAQS em content.ts`)
  for (const [i, item] of faqs.entries()) {
    assert.ok(item.question.trim().length > 0, `FAQS[${i}].question vazia`)
    assert.ok(item.answer.trim().length > 0, `FAQS[${i}].answer vazia`)
  }
})

test('FAQS × FAQPage em sincronia palavra a palavra (name/text, mesma ordem)', () => {
  const entities = faqPage.mainEntity
  assert.equal(
    entities.length,
    faqs.length,
    `FAQPage tem ${entities.length} perguntas; content.ts tem ${faqs.length} FAQS`,
  )

  for (const [i, item] of faqs.entries()) {
    const entity = entities[i]
    assert.equal(entity['@type'], 'Question', `mainEntity[${i}] deve ser @type Question`)
    assert.ok(entity.acceptedAnswer, `mainEntity[${i}] sem acceptedAnswer`)
    assert.equal(entity.acceptedAnswer['@type'], 'Answer', `mainEntity[${i}].acceptedAnswer deve ser @type Answer`)
    assert.equal(
      entity.name,
      item.question,
      `mainEntity[${i}].name divergiu da question de FAQS[${i}] (id: ${item.id})`,
    )
    assert.equal(
      entity.acceptedAnswer.text,
      item.answer,
      `mainEntity[${i}].acceptedAnswer.text divergiu do answer de FAQS[${i}] (id: ${item.id})`,
    )
  }
})

test(`priceRange continua "${EXPECTED_PRICE_RANGE}"`, () => {
  assert.equal(professional.priceRange, EXPECTED_PRICE_RANGE, 'priceRange do ProfessionalService mudou')
})
