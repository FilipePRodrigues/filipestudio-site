export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  cover?: string
  tags: string[]
  body: string
}

export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  cover?: string
  tags: string[]
}
