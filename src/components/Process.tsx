import { PROCESS_STEPS } from '../data/content.ts'
import { TiltCard } from './spell/TiltCard.tsx'

import type { ProcessStep } from '../types/index.ts'

type ProcessProps = {
  /** Itens exibidos na seção. */
  steps?: ProcessStep[]
  /** Texto do label acima do título. */
  label?: string
  /** Título (h2) da seção. */
  heading?: string
  /** Descrição (p) da seção. */
  description?: string
}

export function Process({
  steps = PROCESS_STEPS,
  label = 'Como funciona',
  heading = 'Simples, transparente e sem surpresa',
  description = 'Quatro etapas claras pra tirar o projeto do papel e colocar no ar com qualidade.',
}: ProcessProps = {}) {
  const WEEKS = 4
  const DAYS = 5

  // Semana 1..4 (wk 1..wk 4) vindo do array de steps
  const weekSteps = Array.from({ length: WEEKS }, (_, i) => steps[i])

  return (
    <section id="processo" className="relative py-20 sm:py-28" aria-labelledby="processo-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="pixel-label">{label}</span>
          <h2
            id="processo-title"
            className="luxury-title mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white"
          >
            {heading}
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{description}</p>
        </div>

        {/* semanas/colunas (wk 1..wk 4) */}
        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 reveal-stagger">
          {weekSteps.map((step, weekIdx) => {
            const weekKey = step?.id ?? `wk-${weekIdx + 1}`

            return (
              <li key={weekKey} className="list-none reveal">
                <div className="flex w-full flex-col items-center">
                  <span
                    className="font-pixel text-[10px] uppercase tracking-wider text-slate-900/70 dark:text-white/70"
                    aria-hidden="true"
                  >
                    wk {weekIdx + 1}
                  </span>

                  {/* mini-matriz (dias): TiltCard no 1º quadrado, placeholders nos demais */}
                  <div className="mt-6 grid w-full grid-cols-1 gap-3">
                    {Array.from({ length: DAYS }, (_, dayIdx) => {
                      const isStageSquare = dayIdx === 0

                      if (!step || !isStageSquare) {
                        return (
                          <div
                            key={`${weekKey}-day-${dayIdx}`}
                            aria-hidden="true"
                            className="aspect-square rounded-xl border-2 border-black/10 bg-slate-50/40 dark:border-white/10 dark:bg-white/[0.03]"
                          />
                        )
                      }

                      return (
                        <div key={`${weekKey}-day-${dayIdx}`} className="aspect-square">
                          <TiltCard className="tilt-panel reveal h-full w-full" tiltLimit={8} scale={1.04}>
                            <div className="process-step h-full">
                              <div className="process-num">{step.step}</div>
                              <h3 className="mt-5 font-display text-xl font-semibold text-slate-900 dark:text-white">
                                {step.title}
                              </h3>
                              <p className="mt-3 text-slate-600 dark:text-slate-300">{step.description}</p>
                            </div>
                          </TiltCard>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
