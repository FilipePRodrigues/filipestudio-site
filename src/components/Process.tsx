import { PROCESS_STEPS } from '../data/content.ts'

import type { ProcessStep } from '../types/index.ts'

type ProcessProps = {
  /** Etapas exibidas no stepper (padrão: os 4 PROCESS_STEPS do content.ts). */
  steps?: ProcessStep[]
  /** Kicker mono acima do título (fase-2 §5.05: "// processo"). */
  label?: string
  /**
   * H2 bicolor (fase-2 §3.4): [linha 1 (peso 500), linha 2 (fill grad-marca)].
   * Renderizado como texto + `<br>` sob `.luxury-title` — o split do
   * `setupTitleMasks` exige texto puro por linha (nunca spans de linha).
   */
  titleLines?: [string, string]
  /** Lead (p) real abaixo do título (fase-2 §5.05). */
  description?: string
}

/* Grade decorativa semana/dia (fase-2 §5.05): 4 semanas × 5 dias úteis;
   15 dias preenchidos = "Entrega em até 15 dias" do plano Essencial (dia 15). */
const WEEKS = 4
const DAYS_PER_WEEK = 5
const FILLED_DAYS = 15

/**
 * Processo (FS-010.9 — fase-2 §5.05): padrão E (4/8) com stepper 01–04 trocado
 * por radios `:checked` (teclado nativo — Tab + setas — sem JS novo), painel de
 * descrição à direita e grade semana/dia decorativa (aria-hidden) como "dado
 * visual" do cronograma, preenchida com `grad-marca`.
 *
 * Contratos preservados (docs/home-dom-contract.md §2/§3):
 * - `section#processo` + `aria-labelledby="processo-title"`;
 * - `h2#processo-title.luxury-title` (texto + `<br>` apenas);
 * - `.reveal` preservado (entrada de scroll do kit);
 * - copy `PROCESS_STEPS` exata (content.ts intocado).
 */
export function Process({
  steps = PROCESS_STEPS,
  label = '// processo',
  titleLines = ['Simples, transparente', 'e sem surpresa.'],
  description = 'Quatro etapas claras pra tirar o projeto do papel e colocar no ar com qualidade.',
}: ProcessProps = {}) {
  return (
    <section id="processo" className="processo" aria-labelledby="processo-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="processo__mark" aria-hidden="true" />

        <header className="processo__head reveal">
          <div className="min-w-0">
            <p className="kicker">{label}</p>
            <h2
              id="processo-title"
              className="luxury-title mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white"
            >
              {titleLines[0]}
              <br />
              {titleLines[1]}
            </h2>
            <p className="processo__lead">{description}</p>
          </div>
          <p className="micro processo__count">05/08</p>
        </header>

        {/*
          Stepper 01–04 por radios `:checked` (protótipo §05): os inputs são
          irmãos de `.stepper`/`.proc-panels` para os seletores `~` do CSS.
          Troca de etapa = clique no label ou teclado nativo do radio group
          (Tab foca o radio marcado; setas trocam e marcam) — zero JS novo.
        */}
        <div className="process-grid reveal">
          {steps.map((step, index) => (
            <input
              key={step.id}
              className="proc-radio"
              type="radio"
              name="proc"
              id={`proc-${index + 1}`}
              defaultChecked={index === 0}
            />
          ))}

          <ol className="stepper">
            {steps.map((step, index) => (
              <li key={step.id}>
                <label htmlFor={`proc-${index + 1}`}>
                  <span className="num">{step.step}</span>
                  <span className="step-title">{step.title}</span>
                </label>
              </li>
            ))}
          </ol>

          <div className="proc-panels">
            {steps.map((step) => (
              <div key={step.id} className="proc-panel">
                <p className="kicker">{`// etapa ${step.step}`}</p>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* grade semana/dia — "dado visual" decorativo do cronograma */}
        <div className="week-grid reveal">
          <div className="week-cols" aria-hidden="true">
            {Array.from({ length: WEEKS }, (_, weekIndex) => (
              <div className="week" key={`week-${weekIndex + 1}`}>
                <h4>semana {String(weekIndex + 1).padStart(2, '0')}</h4>
                <div className="days">
                  {Array.from({ length: DAYS_PER_WEEK }, (_, dayIndex) => {
                    const dayNumber = weekIndex * DAYS_PER_WEEK + dayIndex + 1
                    return (
                      <i
                        key={`day-${dayNumber}`}
                        className={dayNumber <= FILLED_DAYS ? 'on' : undefined}
                      />
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="week-marker">
            <p className="micro">// dia 15 · entrega (Essencial)</p>
            <p className="micro">// cada coluna = semana · cada quadrado = dia</p>
          </div>
          {/* ressalvas de prazos reais — dados do FAQ (content.ts): nada inventado */}
          <p className="micro week-note">
            // landing page: 7 a 10 dias úteis · institucional: 2 a 4 semanas
          </p>
          <p className="micro week-note">
            // projeto customizado: 4 a 8 semanas · cronograma fechado depois do briefing
          </p>
        </div>

        <p className="micro processo__foot">// do briefing ao deploy, sem surpresa</p>
      </div>
    </section>
  )
}
