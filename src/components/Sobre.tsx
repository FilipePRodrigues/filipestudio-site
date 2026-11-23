import { Benefits } from './Benefits.tsx'
import { Metrics } from './Metrics.tsx'
import { PixelGallery } from './PixelGallery.tsx'

/**
 * Shell da seção Sobre (FS-010.3) — composição da fusão aprovada
 * (fase-2 §5.04): bloco editorial → PixelGallery → #beneficios (Benefits) →
 * faixa .metrics (Metrics). Componentes compostos sem modificação.
 *
 * Contratos preservados: `section#sobre`, `#sobre-title`, e o bloco de
 * benefícios permanece `<section id="beneficios" aria-labelledby="beneficios-title">`
 * (D1 — HTML válido; navegação `#beneficios` do NAV_LINKS intacta).
 */
export function Sobre() {
  return (
    <section id="sobre" className="sobre" aria-labelledby="sobre-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="sobre__head reveal">
          <div className="min-w-0">
            <p className="kicker">// sobre</p>
            <h2
              id="sobre-title"
              className="luxury-title mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white"
            >
              Treina, programa<br />e negocia.
            </h2>
          </div>
          <p className="micro sobre__count">04/08</p>
        </header>
      </div>

      {/* Galeria de pixel art (contrato Flight intacto) */}
      <PixelGallery />

      {/* Bloco de diferenciais — âncora #beneficios preservada */}
      <Benefits />

      {/* Faixa de métricas (prova social) */}
      <Metrics />
    </section>
  )
}
