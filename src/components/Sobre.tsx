import { Benefits } from './Benefits.tsx'
import { Metrics } from './Metrics.tsx'
import { PixelGallery } from './PixelGallery.tsx'

/**
 * Seção Sobre (FS-010.8 — fusão aprovada, fase-2 §04):
 * bio editorial (fatias reais — dev de BH que treina/programa/negocia,
 * autor do blog "Treino, disciplina e constância", one-person studio) →
 * prancha de fig. (PixelGallery) → bloco `#beneficios` (Benefits) →
 * faixa `.metrics` (Metrics).
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

        {/* bio editorial — apenas fatos reais (fase-2 §04) */}
        <p className="sobre__bio">
          Eu sou o Filipe — dev criativo de Belo Horizonte que{' '}
          <strong>treina, programa e negocia</strong>. Autor do blog{' '}
          <em>Treino, disciplina e constância</em>, atleta fora do teclado e o time
          inteiro por trás do FilipeStudio: um one-person studio que entrega do
          design ao deploy. Este site aqui é a prova — React + TypeScript,
          Lighthouse 95+, blog automatizado e CI/CD.
        </p>

        {/* prancha de fig. (contrato Flight aposentado — plano §1.3) */}
        <PixelGallery />

        {/* Bloco de diferenciais — âncora #beneficios preservada */}
        <Benefits />

        {/* Faixa de métricas (prova social) */}
        <Metrics />
      </div>
    </section>
  )
}
