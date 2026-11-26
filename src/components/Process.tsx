import type { CSSProperties } from 'react'

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

/* Cronograma integrado ao palco (fase-17 §7): 4 semanas × 5 dias;
   15 dias preenchidos = "Entrega em até 15 dias" do plano Essencial (dia 15);
   dias 16–20 = células tracejadas (dias após a entrega). */
const WEEKS = 4
const DAYS_PER_WEEK = 5
const FILLED_DAYS = 15

/**
 * Processo (FS-017 — fase-17-processo-reformulacao.md, aprovado em 2026-11-26):
 * padrão F "palco horizontal" (substitui o padrão E 4/8 do FS-010.9).
 *
 * Estrutura: head editorial → stepper horizontal 01–04 (trilho editorial) →
 * conector da etapa ativa → palco full-width (painel rico + cronograma
 * integrado + faixa de prazos reais do FAQ) → micro de fechamento. O texto de
 * uma etapa é curto, então painel e dado vivem em faixas empilhadas dentro do
 * mesmo palco — sem coluna vazia (defeitos D1/D2 da spec).
 *
 * Contratos preservados (docs/home-dom-contract.md §2/§3 + spec §3):
 * - `section#processo` + `aria-labelledby="processo-title"`;
 * - `h2#processo-title.luxury-title` (texto + `<br>` apenas);
 * - `.reveal` no cabeçalho, no bloco de conteúdo e no micro de fechamento;
 * - stepper por radios `name="proc"` (Tab + setas nativos, sem JS novo);
 * - copy `PROCESS_STEPS` exata (content.ts intocado) + micros/prazos literais.
 */
export function Process({
  steps = PROCESS_STEPS,
  label = '// processo',
  titleLines = ['Simples, transparente', 'e sem surpresa.'],
  description = 'Quatro etapas claras pra tirar o projeto do papel e colocar no ar com qualidade.',
}: ProcessProps = {}) {
  const total = String(steps.length).padStart(2, '0')
  const weeks = Array.from({ length: WEEKS }, (_, index) => {
    const start = index * DAYS_PER_WEEK + 1
    return { start, end: start + DAYS_PER_WEEK - 1 }
  })

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
          Stepper horizontal 01–04 por radios `:checked` (fase-17 §3): os inputs
          são irmãos de `.stepper`/`.proc-conn`/`.proc-stage` para os seletores
          `~` do CSS. Troca de etapa = clique no label ou teclado nativo do radio
          group (Tab foca o marcado; setas trocam e marcam) — zero JS novo.
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

          {/* conector vertical da etapa ativa → palco (conexão nível 2) */}
          <div className="proc-conn" aria-hidden="true">
            {steps.map((step) => (
              <span key={step.id} />
            ))}
          </div>

          <div className="proc-stage">
            {/* segmento grad-marca na borda superior do palco (nível 3) */}
            <div className="stage__rail" aria-hidden="true">
              {steps.map((step) => (
                <span key={step.id} />
              ))}
            </div>

            <div className="stage__body">
              {/* painel da etapa — conteúdo exato de PROCESS_STEPS */}
              <div className="proc-panels">
                {steps.map((step) => (
                  <div key={step.id} className="proc-panel">
                    <div className="proc-panel__meta">
                      <p className="kicker">{`// etapa ${step.step}`}</p>
                      <p className="micro proc-panel__count">{`${step.step} / ${total}`}</p>
                    </div>
                    <div className="proc-panel__title">
                      <span className="proc-num" aria-hidden="true">
                        {step.step}
                      </span>
                      <h3>{step.title}</h3>
                    </div>
                    <p className="proc-panel__desc">{step.description}</p>
                  </div>
                ))}
              </div>

              {/* cronograma integrado (decorativo: o mesmo dado existe como
                  texto na faixa de prazos — fase-17 §7/§8) */}
              <div className="proc-timeline">
                <div className="tl__head">
                  <p className="micro tl__label">// cronograma · cada célula = 1 dia</p>
                  <p className="tl__key">
                    <span className="tl__sw tl__sw--on" aria-hidden="true" />
                    <span className="micro">dias 1–15</span>
                    <span className="tl__sw tl__sw--off" aria-hidden="true" />
                    <span className="micro">dias 16–20</span>
                  </p>
                </div>

                <div className="tl__grid" aria-hidden="true">
                  {weeks.map(({ start, end }, weekIndex) => {
                    const beyond = start > FILLED_DAYS
                    return (
                      <div
                        key={start}
                        className={beyond ? 'tl__week tl__week--beyond' : 'tl__week'}
                      >
                        {beyond && <p className="micro tl__flag">// dia 15 · entrega (Essencial)</p>}
                        <div className="tl__days">
                          {Array.from({ length: DAYS_PER_WEEK }, (_, dayIndex) => {
                            const day = start + dayIndex
                            const className =
                              day > FILLED_DAYS
                                ? undefined
                                : day === FILLED_DAYS
                                  ? 'on is-mile'
                                  : 'on'
                            return (
                              <i
                                key={day}
                                className={className}
                                style={{ '--i': day - 1 } as CSSProperties}
                              />
                            )
                          })}
                        </div>
                        <div className="tl__axis">
                          <span className="w">{`semana ${String(weekIndex + 1).padStart(2, '0')}`}</span>
                          <span className="d">{`dias ${start}–${end}`}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* prazos reais do FAQ (content.ts) — dado em destaque, não rodapé */}
            <div className="stage__notes">
              <p className="micro stage__notes-label">// prazos reais (faq)</p>
              <div className="stage__notes-lines">
                <p className="micro">
                  // landing page: 7 a 10 dias úteis · institucional: 2 a 4 semanas
                </p>
                <p className="micro">
                  // projeto customizado: 4 a 8 semanas · cronograma fechado depois do briefing
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="micro processo__foot reveal">// do briefing ao deploy, sem surpresa</p>
      </div>
    </section>
  )
}
