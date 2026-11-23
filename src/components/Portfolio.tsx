import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PORTFOLIO } from '../data/content.ts'
import type { PortfolioItem } from '../types/index.ts'

export type PortfolioProps = {
  casesLabel?: string
  title?: string
  description?: string
  items?: PortfolioItem[]
}

/**
 * FS-010.6 — painel de abas estilo editor (protótipo aprovado §02 Projetos).
 * Contratos vivos: `data-spotlight`, `data-image-zoom` (com `<img>` direto) e
 * `data-image-reveal` reanexados nos frames de preview; `#portfolio` +
 * `aria-labelledby="portfolio-title"` preservados. Conteúdo dos cases vem de
 * `src/data/content.ts` (intocado) — a microcopy de apresentação abaixo é
 * literal no componente (plano §1.2.3).
 */

type CaseMeta = {
  file: string
  stack: string
  figName: string
  figCategory: string
  width: number
  height: number
}

/** Microcopy de apresentação por case (aba de arquivo, stack, legenda fig.). */
const CASE_META: Record<string, CaseMeta> = {
  precoabsurdo: {
    file: 'preco-absurdo.tsx',
    stack: 'Node · cron · Vercel',
    figName: 'preco-absurdo',
    figCategory: 'SaaS de ofertas',
    width: 1280,
    height: 720,
  },
  filipestudio: {
    file: 'filipestudio.tsx',
    stack: 'React · TypeScript · GitHub Actions',
    figName: 'filipestudio',
    figCategory: 'este site',
    width: 1280,
    height: 800,
  },
}

// slot futuro: 3º case (portfolio-fptech.*) entra quando existir conteúdo real —
// sem placeholder visível (apenas este comentário; nada é renderizado).

function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n)
}

function caseMeta(item: PortfolioItem): CaseMeta {
  return (
    CASE_META[item.id] ?? {
      file: `${item.id}.tsx`,
      stack: '',
      figName: item.id,
      figCategory: item.category.toLowerCase(),
      width: 1280,
      height: 800,
    }
  )
}

/** headline de resultado = 1ª frase de `description`; o resto é a descrição. */
function splitDescription(description: string): { result: string; desc: string } {
  const sep = description.indexOf('. ')
  if (sep === -1) return { result: description, desc: '' }
  return { result: description.slice(0, sep + 1), desc: description.slice(sep + 2) }
}

export function Portfolio({
  casesLabel = 'Cases',
  title = 'Portfólio',
  description = 'Projetos reais, do design ao deploy. Clica pra abrir.',
  items = PORTFOLIO,
}: PortfolioProps = {}) {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  // Ao trocar de aba, os frames de preview que estavam `hidden` passam a ter
  // caixa de layout: os ScrollTriggers de [data-image-reveal] criados pelo
  // motion.ts precisam recalcular posições para o reveal disparar (e o frame
  // não ficar preso no clipPath inicial). Refresh é operação global padrão do
  // GSAP (igual ao resize) — nenhum JS imperativo novo entra em motion.ts.
  useEffect(() => {
    const raf = window.requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => window.cancelAnimationFrame(raf)
  }, [active])

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number): void {
    const last = items.length - 1
    let next: number | null = null
    if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1
    else if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = last
    if (next === null) return
    event.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="portfolio" className="relative py-20 sm:py-28" aria-labelledby="portfolio-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pf-head reveal">
          <div>
            <span className="pixel-label">{casesLabel}</span>
            <h2
              id="portfolio-title"
              className="luxury-title mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white"
            >
              {title}
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{description}</p>
          </div>
          <p className="micro pf-head__micro">// dois arquivos, dois resultados</p>
        </div>

        {/* abas .tsx = navegação de arquivo */}
        <div className="pf-tabs" role="tablist" aria-label="Projetos">
          {items.map((item, index) => {
            const meta = caseMeta(item)
            return (
              <button
                key={item.id}
                ref={(node) => {
                  tabRefs.current[index] = node
                }}
                type="button"
                id={`pf-tab-${index}`}
                role="tab"
                className={`pf-tab${active === index ? ' is-active' : ''}`}
                aria-selected={active === index}
                aria-controls={`pf-panel-${index}`}
                tabIndex={active === index ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
              >
                <span className="pf-tab__dot" aria-hidden="true" />
                {meta.file}
                <span className="sr-only">
                  {' '}
                  — {item.title}, projeto {pad2(index + 1)} de {pad2(items.length)}
                </span>
              </button>
            )
          })}
          <p className="micro pf-tabs__hint">// clica pra abrir</p>
        </div>

        <div className="pf-panel-wrap">
          {items.map((item, index) => {
            const meta = caseMeta(item)
            const { result, desc } = splitDescription(item.description)
            return (
              <div
                key={item.id}
                id={`pf-panel-${index}`}
                className="pf-panel is-entering"
                role="tabpanel"
                aria-labelledby={`pf-tab-${index}`}
                hidden={active !== index}
              >
                <div className="pf-result">
                  <div className="pf-row anim-1">
                    <span className="pf-row__num">01</span>
                    <p className="kicker">// resultado</p>
                  </div>
                  <div className="pf-row anim-2">
                    <span className="pf-row__num">02</span>
                    <h3 className="pf-headline">{result}</h3>
                  </div>
                  <div className="pf-row anim-3">
                    <span className="pf-row__num">03</span>
                    <p className="pf-context">
                      # {item.category}
                      {meta.stack ? <span className="pf-stack"> · {meta.stack}</span> : null}
                    </p>
                  </div>
                  <div className="pf-row anim-4">
                    <span className="pf-row__num">04</span>
                    <p className="pf-desc">{desc}</p>
                  </div>
                  <div className="pf-row anim-5">
                    <span className="pf-row__num">05</span>
                    <p>
                      <a
                        className="btn-secondary"
                        href={item.href ?? '#contato'}
                        {...(item.href ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        Abrir projeto <span aria-hidden="true">↗</span>
                      </a>
                    </p>
                  </div>
                </div>

                <div className="pf-preview">
                  <p className="kicker anim-1">// preview</p>
                  <div className="pf-browser anim-2" data-spotlight data-image-zoom data-image-reveal>
                    <div className="pf-browser__bar">
                      <span className="pf-browser__dot" aria-hidden="true" />
                      <span className="pf-browser__dot" aria-hidden="true" />
                      <span className="pf-browser__dot" aria-hidden="true" />
                      <span className="pf-browser__url">{item.href ?? ''}</span>
                    </div>
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={`Screenshot do projeto ${item.title}`}
                        width={meta.width}
                        height={meta.height}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : null}
                  </div>
                  <p className="fig anim-3">
                    fig. {pad2(index + 1)} · {meta.figName} · {meta.figCategory}
                  </p>
                </div>
              </div>
            )
          })}

          {/* status bar: main · projetos + 01 / 02 */}
          <div className="status-bar pf-status-bar">
            <p className="micro">main · projetos</p>
            <div className="pf-counter">
              <span className="micro">
                {pad2(active + 1)} / {pad2(items.length)}
              </span>
              <div className="pf-progress" aria-hidden="true">
                <i style={{ width: `${((active + 1) / items.length) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
