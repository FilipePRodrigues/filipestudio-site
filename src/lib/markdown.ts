import DOMPurify from 'dompurify'
import { marked } from 'marked'
import { assetUrl } from './asset.ts'

marked.setOptions({
  gfm: true,
  breaks: true,
})

// Links com target=_blank sempre recebem rel de segurança (evita tabnabbing
// em conteúdo de terceiros, ex.: links de issues do blog).
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName === 'A' && node.getAttribute('target') === '_blank') {
    node.setAttribute('rel', 'noopener noreferrer')
  }
})

function rewriteAssetPaths(html: string): string {
  return html.replace(
    /(src|href)="\/([^"]+)"/g,
    (_match, attr: string, path: string) => `${attr}="${assetUrl(`/${path}`)}"`,
  )
}

export function renderMarkdown(markdown: string): string {
  const raw = marked.parse(markdown, { async: false })
  const safe = DOMPurify.sanitize(raw, {
    ADD_ATTR: ['target', 'rel'],
  })
  return rewriteAssetPaths(safe)
}
