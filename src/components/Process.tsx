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
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            {description}
          </p>
        </div>

        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 reveal-stagger">
          {steps.map((step) => (
            <li key={step.id} className="list-none">
              <TiltCard className="tilt-panel reveal h-full" tiltLimit={8} scale={1.04}>
                <div className="process-step h-full">
                  <div className="process-num">{step.step}</div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-slate-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-slate-600 dark:text-slate-300">{step.description}</p>
                </div>
              </TiltCard>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
