import { assetUrl } from './asset.ts'
import type { BlogPost, BlogPostMeta } from '../types/blog.ts'

const modules = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function parseFrontmatter(raw: string): {
  data: Record<string, string>
  body: string
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, body: raw }

  const data: Record<string, string> = {}
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

function slugFromPath(path: string): string {
  const file = path.split('/').pop() ?? path
  return file.replace(/\.md$/, '')
}

function parseTags(value: string | undefined): string[] {
  if (!value) return []
  return value
    .replace(/^\[|\]$/g, '')
    .split(',')
    .map((tag) => tag.trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean)
}

function toPost(path: string, raw: string): BlogPost {
  const { data, body } = parseFrontmatter(raw)
  const slug = data.slug?.trim() || slugFromPath(path)
  const cover = data.cover?.trim()

  return {
    slug,
    title: data.title?.trim() || slug,
    date: data.date?.trim() || '',
    excerpt: data.excerpt?.trim() || '',
    cover: cover ? assetUrl(cover) : undefined,
    tags: parseTags(data.tags),
    body,
  }
}

function parseDate(value: string): number {
  const timestamp = Date.parse(value)
  return Number.isNaN(timestamp) ? 0 : timestamp
}

const posts = Object.entries(modules)
  .map(([path, raw]) => toPost(path, raw))
  .filter((post) => post.slug !== 'COMO-POSTAR')
  .sort((a, b) => parseDate(b.date) - parseDate(a.date))

export function getBlogPosts(): BlogPostMeta[] {
  return posts.map(({ body: _body, ...meta }) => meta)
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug)
}
