import { PORTFOLIO } from '../data/content.ts'
import { TiltCard } from './spell/TiltCard.tsx'

export function Portfolio() {
  return (
    <section id="portfolio" className="relative py-20 sm:py-28" aria-labelledby="portfolio-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="pixel-label">Cases</span>
          <h2
            id="portfolio-title"
            className="luxury-title mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white"
          >
            Portfólio
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Projetos reais, do design ao deploy. Clica pra abrir.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2">
          {PORTFOLIO.map((item) => (
            <TiltCard key={item.id} className="tilt-panel reveal">
              <a
                href={item.href ?? '#contato'}
                className="portfolio-card group block"
                data-spotlight
                {...(item.href
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                <div className={`portfolio-thumb bg-gradient-to-br ${item.gradient}`} data-image-zoom data-image-reveal>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={`Preview do projeto ${item.title}`}
                      width={800}
                      height={500}
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
                        className="mx-auto grid h-14 w-14 place-items-center border-2 border-white/40 bg-white/10 text-2xl"
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
                      className="pixel-badge absolute right-3 top-3"
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
                  <p className="font-pixel text-[9px] uppercase tracking-wider text-roxo dark:text-ciano">
                    {item.category}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
                  {item.href ? (
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-roxo dark:text-ciano">
                      Abrir projeto
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  ) : null}
                </div>
              </a>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
