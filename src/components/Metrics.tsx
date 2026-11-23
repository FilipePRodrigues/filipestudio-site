import { METRICS } from '../data/content.ts'

import type { Metric } from '../types/index.ts'

/**
 * Formato `data-count` LIMPO (plano §1.2.4, FS-010.8):
 * `data-count` = número limpo; `data-suffix` = resto; nó SEM filhos
 * (`setupCountUp` sobrescreve `textContent`).
 */
function metricAnim(value: string): { count?: string; suffix?: string } {
  if (value === '95+') return { count: '95', suffix: '+' }
  if (value === '100%') return { count: '100', suffix: '%' }
  if (value === '30–90d') return { count: '30', suffix: '–90d' }
  return {}
}

type MetricsProps = {
  /** Itens exibidos na seção. */
  metrics?: Metric[]
  /** Texto do aria-label da section. */
  ariaLabel?: string
}

/**
 * Faixa `.metrics` de prova social (FS-010.8 — fase-2 §04): 4 itens, os 3
 * animados com count-up (`95`+`+`, `100`+`%`, `30`+`–90d`) e "Mobile-first"
 * como texto estático. Conteúdo = `METRICS` exato do content.ts.
 */
export function Metrics({
  metrics = METRICS,
  ariaLabel = 'Números do FilipeStudio',
}: MetricsProps = {}) {
  return (
    <section className="metrics" aria-label={ariaLabel}>
      {metrics.map((metric) => {
        const anim = metricAnim(metric.value)
        return (
          <div className="metric" key={metric.id}>
            <p
              className="metric__value"
              {...(anim.count
                ? { 'data-count': anim.count, 'data-suffix': anim.suffix }
                : {})}
            >
              {metric.value}
            </p>
            <p className="metric__label">{metric.label}</p>
            <p className="metric__detail">{metric.detail}</p>
          </div>
        )
      })}
    </section>
  )
}
