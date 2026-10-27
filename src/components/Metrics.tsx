import { METRICS } from '../data/content.ts'
import { TiltCard } from './spell/TiltCard.tsx'

function metricAnim(value: string): { count?: string; suffix?: string } {
  if (value === '95+') return { count: '95', suffix: '+' }
  if (value === '100%') return { count: '100', suffix: '%' }
  if (value === '30–90d') return { count: '90', suffix: 'd' }
  return {}
}

export function Metrics() {
  return (
    <section className="relative border-y-2 border-black/10 bg-white/50 py-14 dark:border-white/10 dark:bg-white/[0.03]" aria-label="Números do FilipeStudio">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal-stagger grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {METRICS.map((metric) => {
            const anim = metricAnim(metric.value)
            return (
              <TiltCard
                key={metric.id}
                tiltLimit={10}
                scale={1.05}
                perspective={1200}
                className="tilt-panel reveal"
              >
                <div className="metric-card h-full">
                  <div
                    className="font-display text-3xl font-bold tracking-tight text-roxo sm:text-4xl dark:text-ciano"
                    {...(anim.count
                      ? { 'data-count': anim.count, 'data-suffix': anim.suffix }
                      : {})}
                  >
                    {metric.value}
                  </div>
                  <div className="mt-2 font-display text-sm font-semibold text-slate-900 dark:text-white">
                    {metric.label}
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    {metric.detail}
                  </p>
                </div>
              </TiltCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
