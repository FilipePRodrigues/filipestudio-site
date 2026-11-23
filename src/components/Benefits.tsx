import { BENEFITS } from '../data/content.ts'
import { ArrowRight } from './icons.tsx'

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

/**
 * Bloco de diferenciais (FS-010.8 — fase-2 §04): lista editorial numerada
 * com os 6 `BENEFITS` exatos (NÃO cards) sob a âncora `#beneficios`.
 * Contratos preservados: `section#beneficios` + `aria-labelledby="beneficios-title"`
 * (teste 1) e `p.pull-quote[data-pull-quote]` limpo — o motion injeta
 * `.pull-quote__bar` como 1º filho (teste 3).
 */
export function Benefits({
  benefits = BENEFITS,
  label = '// beneficios',
  heading = 'Não é só um site.\nÉ máquina de vender.',
  pullQuote = '// bh, br · one-person studio · do design ao deploy',
  ctaLabel = 'Bora conversar',
}: BenefitsProps = {}) {
  const [headingLine1, headingLine2] = heading.split('\n')

  return (
    <section id="beneficios" className="beneficios" aria-labelledby="beneficios-title">
      <p className="kicker">{label}</p>
      <h2
        id="beneficios-title"
        className="luxury-title mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white"
      >
        {headingLine1}
        <br />
        {headingLine2}
      </h2>

      {/* lista editorial numerada (fase-2 §04 — "não cards") */}
      <ol className="beneficios__list">
        {benefits.map((benefit, index) => (
          <li className="beneficio" key={benefit.id}>
            <span className="num" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0">
              <h3 className="beneficio__title">{benefit.title}</h3>
              <p className="beneficio__desc">{benefit.description}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* pull-quote do contrato (motion injeta .pull-quote__bar) */}
      <p className="pull-quote beneficios__quote" data-pull-quote>
        {pullQuote}
      </p>

      <div className="beneficios__cta">
        <a href="#contato" className="btn-primary">
          {ctaLabel}
          <ArrowRight />
        </a>
      </div>
    </section>
  )
}
