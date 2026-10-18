import { SERVICES } from '../data/content.ts'
import { PixelIcon } from './PixelIcon.tsx'

export function Services() {
  return (
    <section id="servicos" className="relative py-20 sm:py-28" aria-labelledby="servicos-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="pixel-label">Serviços</span>
          <h2
            id="servicos-title"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white"
          >
            O que eu faço por você
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Do conceito ao deploy — e depois também. Cada projeto pensado pra gerar
            autoridade, leads e vendas de verdade.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <article key={service.id} className="service-card reveal">
              <div className="service-icon">
                <PixelIcon name={service.icon} />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-slate-900 dark:text-white">
                {service.title}
              </h3>
              <p className="mt-3 text-slate-600 dark:text-slate-300">{service.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-500 dark:text-slate-400">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <span className="mt-0.5 font-pixel text-[10px] text-roxo" aria-hidden="true">
                      ►
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
