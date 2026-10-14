import { METRICS, TESTIMONIALS } from '../data/content.ts'
import { useCounter } from '../hooks/useCounter.ts'

function Metric({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { value: current, ref } = useCounter(value)
  return (
    <div className="metric-card reveal">
      <p className="font-display text-3xl font-bold text-slate-900 dark:text-white">
        <span ref={ref}>{current}</span>
        {suffix}
      </p>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  )
}

export function Testimonials() {
  return (
    <section
      id="depoimentos"
      className="relative overflow-hidden py-20 sm:py-28"
      aria-labelledby="depoimentos-title"
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-violet/[0.05] to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-neon-cyan">Depoimentos</p>
          <h2
            id="depoimentos-title"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white"
          >
            Quem trabalha comigo recomenda
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Substitua pelos depoimentos reais dos seus clientes. Confiança se constrói com prova social.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {METRICS.map((metric) => (
            <Metric key={metric.id} value={metric.value} suffix={metric.suffix} label={metric.label} />
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <figure key={item.id} className="testimonial-card reveal">
              <div className="flex gap-1 text-amber-400" aria-label={`Avaliação: ${item.rating} de 5 estrelas`}>
                {Array.from({ length: item.rating }, (_, i) => (
                  <span key={i} aria-hidden="true">
                    ★
                  </span>
                ))}
              </div>
              <blockquote className="mt-4">
                <p className="text-slate-700 dark:text-slate-200">“{item.quote}”</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className={`avatar bg-gradient-to-br ${item.avatarGradient}`} aria-hidden="true">
                  {item.initials}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
