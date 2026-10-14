import { BENEFITS } from '../data/content.ts'
import { ArrowRight } from './icons.tsx'

export function Benefits() {
  return (
    <section
      id="beneficios"
      className="relative overflow-hidden py-20 sm:py-28"
      aria-labelledby="beneficios-title"
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/[0.04] to-transparent dark:via-neon-violet/[0.06]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="reveal">
            <p className="text-sm font-semibold uppercase tracking-wider text-neon-cyan">
              Por que me escolher
            </p>
            <h2
              id="beneficios-title"
              className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white"
            >
              Não é só um site. É um ativo de vendas.
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Cada decisão de design e código é tomada com um objetivo: fazer o seu negócio crescer.
              Sem template genérico, sem promessa vazia.
            </p>

            <a href="#contato" className="btn-primary mt-8">
              Quero um projeto assim
              <ArrowRight />
            </a>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {BENEFITS.map((benefit) => (
              <div key={benefit.id} className="benefit-card reveal">
                <div className="benefit-icon" aria-hidden="true">
                  {benefit.icon}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-slate-900 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
