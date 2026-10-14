import { PROCESS_STEPS } from '../data/content.ts'

export function Process() {
  return (
    <section id="processo" className="relative py-20 sm:py-28" aria-labelledby="processo-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-neon-cyan">Como funciona</p>
          <h2
            id="processo-title"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white"
          >
            Um processo simples, transparente e sem surpresas
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Quatro etapas claras para tirar o seu projeto do papel e colocar no ar com qualidade.
          </p>
        </div>

        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step) => (
            <li key={step.id} className="process-step reveal">
              <div className="process-num">{step.step}</div>
              <h3 className="mt-5 font-display text-xl font-semibold text-slate-900 dark:text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-slate-600 dark:text-slate-300">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
