import { useMemo } from 'react'
import { renderMarkdown } from '../../lib/markdown.ts'
import type { BlogPost } from '../../types/blog.ts'

function formatDate(date: string): string {
  if (!date) return ''
  const parsed = new Date(`${date}T12:00:00`)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export function BlogPostView({ post }: { post: BlogPost }) {
  const html = useMemo(() => renderMarkdown(post.body), [post.body])

  return (
    <article className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <a
          href="#/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ciano"
        >
          ← Todos os posts
        </a>

        <header className="mt-8">
          {post.tags.length > 0 ? (
            <p className="text-xs font-semibold uppercase tracking-wider text-ciano">
              {post.tags.join(' · ')}
            </p>
          ) : null}
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            {formatDate(post.date)}
            {post.excerpt ? ` · ${post.excerpt}` : ''}
          </p>
        </header>

        {post.cover ? (
          <img
            src={post.cover}
            alt=""
            width={800}
            height={500}
            className="mt-8 w-full border-2 border-black object-cover shadow-pixel dark:border-white/30"
          />
        ) : null}

        <div
          className="prose-blog mt-10"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="mt-12 flex flex-wrap gap-3">
          <a href="#/blog" className="btn-secondary">
            ← Voltar para o blog
          </a>
          <a href="#/" className="btn-primary">
            Conhecer o FilipeStudio
          </a>
        </div>
      </div>
    </article>
  )
}

export function BlogPostNotFound({ slug }: { slug: string }) {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-xl px-4 text-center">
        <span className="pixel-label">Blog</span>
        <h1 className="mt-3 font-display text-3xl font-bold text-slate-900 dark:text-white">
          Post não encontrado
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Não achei o post <code className="text-ciano">{slug}</code>.
        </p>
        <a href="#/blog" className="btn-primary mt-8">
          Ver todos os posts
        </a>
      </div>
    </section>
  )
}
