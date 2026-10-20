import { SITE_META } from './siteMeta.ts'

interface PageMeta {
  title: string
  description: string
  url: string
  image: string
  type: string
}

const defaults: PageMeta = {
  title: SITE_META.title,
  description: SITE_META.description,
  url: SITE_META.url,
  image: SITE_META.image,
  type: 'website',
}

function setMeta(name: string, value: string): void {
  const attr = name.startsWith('og:') || name.startsWith('twitter:') ? 'property' : 'name'
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

export function setPageMeta(meta: Partial<PageMeta>): void {
  const merged = { ...defaults, ...meta }

  merged.title ||= defaults.title
  merged.description ||= defaults.description
  merged.url ||= defaults.url
  merged.image ||= defaults.image
  merged.type ||= defaults.type

  document.title = merged.title
  setMeta('description', merged.description)
  setMeta('og:title', merged.title)
  setMeta('og:description', merged.description)
  setMeta('og:url', merged.url)
  setMeta('og:type', merged.type)
  setMeta('og:image', merged.image)
  setMeta('twitter:title', merged.title)
  setMeta('twitter:description', merged.description)
  setMeta('twitter:image', merged.image)

  let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', merged.url)
}
