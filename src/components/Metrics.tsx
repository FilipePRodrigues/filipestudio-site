import { METRICS } from '../data/content.ts'

export function Metrics() {
  return (
    <section className="relative border-y-2 border-black/10 bg-white/50 py-14 dark:border-white/10 dark:bg-white/[0.03]" aria-label="Números do FilipeStudio">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal-stagger grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {METRICS.map((metric) => (
            <div key={metric.id} className="metric-card reveal">
              <div className="font-display text-3xl font-bold tracking-tight text-roxo sm:text-4xl dark:text-ciano">
                {metric.value}
              </div>
              <div className="mt-2 font-display text-sm font-semibold text-slate-900 dark:text-white">
                {metric.label}
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
