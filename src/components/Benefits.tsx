import { BENEFITS } from '../data/content.ts'
import { ArrowRight } from './icons.tsx'
import { PixelIcon } from './PixelIcon.tsx'
import { TiltCard } from './spell/TiltCard.tsx'

import type { Benefit } from '../types/index.ts'

type BenefitsProps = {
  /** Itens exibidos na seção. */
  benefits?: Benefit[]
  /** Texto do label acima do título. */
  label?: string
  /** Título (h2) da seção. */
  heading?: string
  /** Texto do pull quote (p[data-pull-quote]). */
  pullQuote?: string
  /** Texto do CTA (a.btn-primary). */
  ctaLabel?: string
}

export function Benefits({
  benefits = BENEFITS,
  label = 'Por que eu?',
  heading = 'Não é só um site. É máquina de vender.',
  pullQuote =
    'Cada decisão de design e código tem um objetivo: fazer o seu negócio crescer. Sem template genérico, sem promessa vazia.',
  ctaLabel = 'Quero um projeto assim',
}: BenefitsProps = {}) {
  return (
    <section
      id="beneficios"
      className="relative overflow-hidden py-20 sm:py-28"
      aria-labelledby="beneficios-title"
    >
      <div
        className="absolute inset-0 bg-ciano/[0.04] dark:bg-roxo/[0.06]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="reveal">
            <span className="pixel-label">{label}</span>
            <h2
              id="beneficios-title"
              className="luxury-title mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white"
            >
              {heading}
            </h2>
            <p className="pull-quote mt-5 text-lg font-medium text-slate-700 dark:text-slate-200" data-pull-quote>
              {pullQuote}
            </p>

            <a href="#contato" className="btn-primary mt-8">
              {ctaLabel}
              <ArrowRight />
            </a>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 reveal-stagger">
            {benefits.map((benefit) => (
              <TiltCard key={benefit.id} className="tilt-panel reveal" tiltLimit={8} scale={1.04}>
                <div className="benefit-card h-full">
                  <div className="benefit-icon" aria-hidden="true">
                    <PixelIcon name={benefit.icon} />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-slate-900 dark:text-white">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{benefit.description}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
