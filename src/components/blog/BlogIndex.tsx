import type { BlogPostMeta } from '../../types/blog.ts'

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

export function BlogIndex({ posts }: { posts: BlogPostMeta[] }) {
  return (
    <section className="relative py-20 sm:py-28" aria-labelledby="blog-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-neon-cyan">Blog</p>
          <h1
            id="blog-title"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white"
          >
            Histórias da pista e da vida
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Reflexões sobre atletismo, rotina, constância e o caminho do FilipeStudio.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="mt-16 text-center text-slate-500 dark:text-slate-400">
            Em breve novos posts por aqui.
          </p>
        ) : (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <a
                key={post.slug}
                href={`#/blog/${post.slug}`}
                className="portfolio-card reveal group flex flex-col"
              >
                <div className="portfolio-thumb bg-gradient-to-br from-violet-500/40 via-blue-500/30 to-cyan-400/40">
                  {post.cover ? (
                    <img
                      src={post.cover}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : null}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/80 to-transparent p-4">
                    <p className="text-xs font-medium text-white/90">{formatDate(post.date)}</p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  {post.tags.length > 0 ? (
                    <p className="text-xs font-semibold uppercase tracking-wider text-neon-cyan">
                      {post.tags.slice(0, 2).join(' · ')}
                    </p>
                  ) : null}
                  <h2 className="mt-2 font-display text-lg font-semibold text-slate-900 dark:text-white">
                    {post.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-300">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-neon-cyan">
                    Ler post
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <a href="#/" className="btn-secondary">
            ← Voltar para o início
          </a>
        </div>
      </div>
    </section>
  )
}
