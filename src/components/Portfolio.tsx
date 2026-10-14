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
            Uma seleção de trabalhos recentes. Substitua estes cards pelas suas imagens e cases reais.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO.map((item) => (
            <a key={item.id} href="#contato" className="portfolio-card reveal group">
              <div className={`portfolio-thumb bg-gradient-to-br ${item.gradient}`}>
                <div className="absolute inset-0 grid place-items-center">
                  <div className="px-4 text-center">
                    <div
                      className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-white/25 bg-white/10 text-2xl"
                      aria-hidden="true"
                    >
                      {item.emoji}
                    </div>
                    <p className="mt-3 text-sm font-medium text-white/90">{item.category}</p>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-neon-cyan">
                  {item.category}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
