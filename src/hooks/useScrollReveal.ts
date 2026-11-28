import { useEffect } from 'react'

/**
 * Scroll reveal compartilhado: adiciona `.is-visible` DIRETAMENTE no DOM
 * (fora do React) via IntersectionObserver.
 *
 * Armadilha (FS-019 — bug do FAQ): o React reescreve o atributo `class` do
 * elemento inteiro toda vez que o prop `className` muda, e a string do prop
 * não contém `is-visible`. Num elemento `.reveal` com classe condicional
 * (ex.: `faq-item${open ? ' open' : ''} reveal`), qualquer re-render apaga o
 * reveal → opacity:0 mantendo o layout (título/resposta somem, espaço resta).
 * Regra: em `.reveal`, o `className` do React deve ser ESTÁTICO; estado vai
 * para atributo (`data-*`/`hidden`) ou para filho, nunca para o `class`.
 */
let sharedObserver: IntersectionObserver | null = null
const observedElements = new Set<Element>()

function getObserver(): IntersectionObserver {
  if (sharedObserver) return sharedObserver

  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          sharedObserver?.unobserve(entry.target)
          observedElements.delete(entry.target)
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  )

  return sharedObserver
}

function revealAll(): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => el.classList.add('is-visible'))
    return
  }

  const observer = getObserver()

  document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
    if (observedElements.has(el) || el.classList.contains('is-visible')) return
    observer.observe(el)
    observedElements.add(el)
  })
}

export function useScrollReveal(trigger?: unknown): void {
  useEffect(() => {
    const timeout = setTimeout(revealAll, 80)
    return () => clearTimeout(timeout)
  }, [trigger])

  // also on first mount
  useEffect(() => {
    const timeout = setTimeout(revealAll, 80)
    return () => clearTimeout(timeout)
  }, [])
}