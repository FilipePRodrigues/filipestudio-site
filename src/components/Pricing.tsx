import { PRICING } from '../data/content.ts'
import { TiltCard } from './spell/TiltCard.tsx'

import type { PricingTier } from '../types/index.ts'

type PricingProps = {
  /** Planos exibidos (padrão: os 2 `PRICING` do content.ts — preços/features intocáveis). */
  tiers?: PricingTier[]
  /** Kicker mono acima do título (fase-2 §5.06: "// planos"). */
  label?: string
  /**
   * H2 bicolor (fase-2 §3.4): [linha 1 (peso 500), linha 2 (fill grad-marca)].
   * Renderizado como texto + `<br>` sob `.luxury-title` — o split do
   * `setupTitleMasks` exige texto puro por linha (nunca spans de linha).
   */
  titleLines?: [string, string]
  /** Lead real do protótipo (fase-2 §5.06). */
  lead?: string
}

/**
 * Rótulos de CTA por card (protótipo 06 PLANOS — "Quero o Essencial" e
 * "Solicitar orçamento", ambos `#contato`/`.btn-primary`). O `ctaLabel` do
 * `PRICING` ("Bora conversar"/"Quero esse") é a voz do site atual e permanece
 * intacto no content.ts — a direção do redesign usa os rótulos do protótipo,
 * por isso o mapa vive no componente.
 */
const CTA_LABELS: Record<string, string> = {
  essencial: 'Quero o Essencial',
  profissional: 'Solicitar orçamento',
}

/**
 * Planos (FS-010.10 — fase-2 §5.06 bloco A): kicker `// planos`; H2 bicolor
 * "Investimento" / "sem enrolação."; 2 cards com os `PRICING` exatos (Essencial
 * + Profissional destacado com borda `grad-marca` + badge mono "★ Mais
 * popular"); CTAs `#contato`; barra mono de atenção. Capítulo "decisão"
 * (Planos → FAQ), seções e âncoras próprias preservadas.
 *
 * Contratos preservados (docs/home-dom-contract.md §2/§3/§4):
 * - `section#planos` + `aria-labelledby="planos-title"`;
 * - `h2#planos-title.section-title.luxury-title` (texto + `<br>`);
 * - `data-spotlight` nos cards (reuso do kit/setupSpotlight) + TiltCard;
 * - preços/features do `PRICING` exibidos sem alteração (nunca inventar valor
 *   para o "Sob consulta").
 */
export function Pricing({
  tiers = PRICING,
  label = '// planos',
  titleLines = ['Investimento', 'sem enrolação.'],
  lead = 'Pacotes flexíveis pra cada momento do seu negócio. O Profissional é sob medida — conta teu projeto e eu mando a proposta.',
}: PricingProps = {}) {
  return (
    <section id="planos" className="planos" aria-labelledby="planos-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="planos__mark" aria-hidden="true" />
        <header className="planos__head reveal">
          <div className="min-w-0">
            <p className="kicker">{label}</p>
            <h2
              id="planos-title"
              className="section-title luxury-title mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white"
            >
              {titleLines[0]}
              <br />
              {titleLines[1]}
            </h2>
            <p className="planos__lead">{lead}</p>
          </div>
          <p className="micro planos__count">06/08</p>
        </header>

        <div className="planos__grid reveal-stagger">
          {tiers.map((tier) => (
            <TiltCard key={tier.id} className="planos__tilt reveal" tiltLimit={6} scale={1.02}>
              <article className={`plan${tier.featured ? ' plan--featured' : ''}`} data-spotlight>
                {tier.featured ? <p className="plan-badge">★ Mais popular</p> : null}
                <h3 className="plan-name">{tier.name}</h3>
                <p className="plan-desc">{tier.description}</p>
                <p className="plan-price">
                  <span className="plan-price__value">{tier.priceLabel}</span>
                  <span className="plan-price__note">{tier.priceNote}</span>
                </p>
                <ul className="plan-features">
                  {tier.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <a className="btn-primary plan-cta" href="#contato">
                  {CTA_LABELS[tier.id] ?? tier.ctaLabel}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </article>
            </TiltCard>
          ))}
        </div>

        <p className="attention-bar micro planos__attention">
          // preço fechado depois do briefing — sem surpresa
        </p>
      </div>
    </section>
  )
}
