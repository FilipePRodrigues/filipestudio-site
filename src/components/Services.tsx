import { SERVICES } from '../data/content.ts'
import type { Service } from '../types/index.ts'
import { PixelIcon } from './PixelIcon.tsx'

type ServicesProps = {
  /** Itens exibidos na seção (padrão: os 6 SERVICES do content.ts). */
  services?: Service[]
  /** Kicker mono acima do título (fase-2 §5.03: "// servicos"). */
  label?: string
  /**
   * H2 bicolor (fase-2 §3.4): [linha 1 (peso 500), linha 2 (fill grad-marca)].
   * Renderizado como texto + `<br>` sob `.luxury-title` — o split do
   * `setupTitleMasks` exige texto puro por linha (nunca spans de linha).
   */
  titleLines?: [string, string]
}

/**
 * Serviços (FS-010.7 — fase-2 §5.03): grid editorial 3×2 (padrão D) com os 6
 * `SERVICES` reais, destaque editorial em "Landing Pages que Convertem" (borda
 * `grad-marca` 2px no topo), numeração mono 01–06 e legendas `fig. 0N ·` com
 * PixelIcon. CTA único do protótipo: "Quero um projeto assim" → `#contato`.
 *
 * Contratos preservados (docs/home-dom-contract.md §2/§3/§4):
 * - `section#servicos` + `aria-labelledby="servicos-title"`;
 * - `h2#servicos-title.section-title.luxury-title` (texto + `<br>`);
 * - `data-spotlight` nos cards (reuso do kit/setupSpotlight);
 * - `data-flight-icon` nos ícones (vem do PixelIcon — setupIconFlight segue).
 */
export function Services({
  services = SERVICES,
  label = '// servicos',
  titleLines = ['O que eu faço', 'por você'],
}: ServicesProps = {}) {
  return (
    <section id="servicos" className="servicos" aria-labelledby="servicos-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="servicos__head reveal">
          <div className="min-w-0">
            <p className="kicker">{label}</p>
            <h2
              id="servicos-title"
              className="section-title luxury-title mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white"
            >
              {titleLines[0]}
              <br />
              {titleLines[1]}
            </h2>
          </div>
          <p className="micro servicos__count">03/08</p>
        </header>

        <div className="svc-grid reveal-stagger">
          {services.map((service, index) => {
            const number = String(index + 1).padStart(2, '0')
            const isFeature = service.title === 'Landing Pages que Convertem'
            return (
              <article
                key={service.id}
                className={`svc-card reveal${isFeature ? ' svc-card--feature' : ''}`}
                data-spotlight
              >
                <div className="svc-top">
                  <span className="svc-num">{number}</span>
                  <figure className="svc-fig">
                    <div className="service-icon">
                      <PixelIcon name={service.icon} className="svc-fig__img" />
                    </div>
                    <figcaption className="fig">
                      fig. {number} · {service.icon}
                    </figcaption>
                  </figure>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className="svc-bullets">
                  {service.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>

        <div className="svc-cta">
          <a className="btn-primary" href="#contato">
            Quero um projeto assim
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
        </div>
      </div>
    </section>
  )
}
