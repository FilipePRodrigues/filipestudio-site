import { PORTFOLIO } from '../data/content.ts'

export function Portfolio() {
  return (
    <section id="portfolio" className="relative py-20 sm:py-28" aria-labelledby="portfolio-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-neon-cyan">Portfólio</p>
          <h2
            id="portfolio-title"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white"
          >
            Projetos que geram resultado
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Uma seleção de trabalhos recentes. Clique em um projeto para ver o preview completo.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO.map((item) => (
            <a
              key={item.id}
              href={item.href ?? '#contato'}
              className="portfolio-card reveal group"
              {...(item.href
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              <div className={`portfolio-thumb bg-gradient-to-br ${item.gradient}`}>
                {item.image ? (
                  <img
                    src={item.image}
                    alt={`Preview do projeto ${item.title}`}
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                ) : null}
                <div
                  className={`absolute inset-0 grid place-items-center ${
                    item.image
                      ? 'bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100'
                      : ''
                  }`}
                >
                  <div className="px-4 text-center">
                    <div
                      className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-white/25 bg-white/10 text-2xl"
                      aria-hidden="true"
                    >
                      {item.emoji}
                    </div>
                    <p className="mt-3 text-sm font-medium text-white/90">
                      {item.image ? 'Ver projeto' : item.category}
                    </p>
                  </div>
                </div>
                {item.href ? (
                  <span
                    className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-ink-900 shadow-soft dark:bg-ink-900/90 dark:text-white"
                    aria-hidden="true"
                  >
                    Preview
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </span>
                ) : null}
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-neon-cyan">
                  {item.category}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
                {item.href ? (
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-neon-cyan">
                    Abrir projeto
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                ) : null}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
