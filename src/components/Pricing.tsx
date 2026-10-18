import { PRICING } from '../data/content.ts'

export function Pricing() {
  return (
    <section id="planos" className="relative py-20 sm:py-28" aria-labelledby="planos-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="pixel-label">Planos</span>
          <h2
            id="planos-title"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white"
          >
            Investimento sem enrolação
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Pacotes flexíveis pra cada momento do seu negócio. O Profissional é sob medida —
            conta teu projeto e eu mando a proposta.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {PRICING.map((tier) => (
            <article
              key={tier.id}
              className={`pricing-card reveal ${tier.featured ? 'pricing-featured' : ''}`}
            >
              {tier.featured ? (
                <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2">
                  <div className="inline-flex items-center border-2 border-black bg-ciano px-4 py-1.5 font-pixel text-[10px] uppercase tracking-wider text-black shadow-pixel">
                    ★ Mais popular
                  </div>
                </div>
              ) : null}
              <h3
                className={`font-display text-lg font-semibold ${
                  tier.featured
                    ? 'mt-4 text-white'
                    : 'text-slate-900 dark:text-white'
                }`}
              >
                {tier.name}
              </h3>
              <p className={`mt-2 text-sm ${tier.featured ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>
                {tier.description}
              </p>
              <p className="mt-6">
                <span className={`text-sm ${tier.featured ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>
                  {tier.priceNote}
                </span>
                <span
                  className={`mt-1 block font-display text-4xl font-bold tracking-tight ${
                    tier.featured ? 'text-white' : 'text-slate-900 dark:text-white'
                  }`}
                >
                  {tier.priceLabel}
                </span>
              </p>
              <ul
                className={`mt-8 space-y-3 text-sm ${
                  tier.featured ? 'text-slate-200' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-0.5 font-pixel text-[10px] text-ciano" aria-hidden="true">
                      ►
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
