import DOMPurify from 'dompurify'
import { marked } from 'marked'
import { assetUrl } from './asset.ts'

marked.setOptions({
  gfm: true,
  breaks: true,
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
