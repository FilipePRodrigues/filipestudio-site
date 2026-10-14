import { PRICING } from '../data/content.ts'

export function Pricing() {
  return (
    <section id="planos" className="relative py-20 sm:py-28" aria-labelledby="planos-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-neon-cyan">Planos</p>
          <h2
            id="planos-title"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white"
          >
            Investimento transparente
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Pacotes flexíveis para cada momento do seu negócio. O plano Profissional é orçado sob
            medida — conte o seu projeto e receba uma proposta.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {PRICING.map((tier) => (
            <article
              key={tier.id}
              className={`pricing-card reveal ${tier.featured ? 'pricing-featured' : ''}`}
            >
              {tier.featured ? (
                <div className="inline-flex w-fit items-center rounded-full bg-gradient-to-r from-neon-cyan to-neon-violet px-3 py-1 text-xs font-semibold text-ink-950">
                  Mais popular
                </div>
              ) : null}
              <h3
                className={`font-display text-lg font-semibold text-slate-900 dark:text-white ${
                  tier.featured ? 'mt-4' : ''
                }`}
              >
                {tier.name}
              </h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{tier.description}</p>
              <p className="mt-6">
                <span className="text-sm text-slate-500 dark:text-slate-400">{tier.priceNote}</span>
                <span className="block font-display text-4xl font-bold text-slate-900 dark:text-white">
                  {tier.priceLabel}
                </span>
              </p>
              <ul className="mt-8 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-0.5 text-neon-cyan" aria-hidden="true">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#contato"
                className={`mt-8 w-full ${tier.featured ? 'btn-primary' : 'btn-secondary'}`}
              >
                {tier.ctaLabel}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
