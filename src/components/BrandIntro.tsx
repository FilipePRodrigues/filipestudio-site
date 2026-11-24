import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { assetUrl } from '../lib/asset.ts'
import { prefersReducedMotion } from '../lib/motion.ts'

/** FS-011.1 · orçamento do splash (fase-2: "reduzir para ≤1.2s"). */
const SPLASH_MAX_S = 1.2

/**
 * Entrada da marca no home (estilo Luxury / Museum of Motion).
 * Sobreposta e curta: monograma revela, wordmark sobe em máscara, painel sai.
 *
 * FS-011.1 — splash curto (≤1,2 s):
 * - a coreografia continua 100% no `setupBrandIntro` de src/lib/motion.ts
 *   (intocado); aqui só calibramos a velocidade da timeline que ele cria para
 *   o splash inteiro caber em SPLASH_MAX_S;
 * - `html.brand-intro-lock` entra antes do primeiro paint (anti-piscada: o hero
 *   não aparece por baixo do painel) e é removido ao final do splash — com
 *   fail-safe para o splash NUNCA bloquear o hero;
 * - prefers-reduced-motion (ou `data-motion="reduced"`): logo estático 200 ms
 *   e a página segue (CSS em src/styles/home/intro.css).
 */
export function BrandIntro() {
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const intro = rootRef.current
    if (!intro) return
    const doc = document.documentElement

    if (prefersReducedMotion()) {
      // fallback: logo estático 200 ms, sem trava de scroll (o corte é CSS)
      const timer = window.setTimeout(() => {
        intro.classList.add('is-done')
        intro.style.visibility = 'hidden'
        intro.style.display = 'none'
      }, 260)
      return () => window.clearTimeout(timer)
    }

    // anti-piscada: trava scroll e esconde o hero antes do 1º paint; o
    // motion.ts reforça a classe e a remove quando o splash termina
    doc.classList.add('brand-intro-lock')

    const revealHero = () => {
      document.querySelectorAll<HTMLElement>('[data-hero-part]').forEach((part) => {
        part.style.opacity = '1'
        part.style.transform = 'none'
      })
    }

    const release = () => {
      doc.classList.remove('brand-intro-lock')
      intro.classList.add('is-done')
      intro.style.visibility = 'hidden'
      intro.style.display = 'none'
    }

    // corte seco: garante que o splash NUNCA passe do orçamento nem bloqueie
    // o hero (mata a timeline para o onComplete dela não reexibir o hero)
    const cut = () => {
      if (intro.classList.contains('is-done')) return
      const timeline = gsap
        .getTweensOf(intro)
        .map((tween) => tween.parent)
        .find((parent) => parent !== null)
      if (timeline) timeline.kill()
      release()
      revealHero()
    }

    // duração total do splash ≤ SPLASH_MAX_S: se o motion não concluir a
    // tempo, corta aqui (no caso normal o onComplete do motion.ts vence)
    const hardCut = window.setTimeout(cut, Math.round(SPLASH_MAX_S * 1000))

    // fail-safe final: página sempre utilizável, mesmo sem GSAP
    const failSafe = window.setTimeout(() => {
      if (doc.classList.contains('brand-intro-lock')) cut()
    }, 3000)

    // calibra a timeline do setupBrandIntro para ≤ SPLASH_MAX_S sem reescrever
    // o motion: encontra a timeline pelo tween de saída do painel e acelera a
    // reprodução (timeScale) pelo fator necessário — o orçamento é medido a
    // partir do 1º paint (o init do motion.ts tem 120 ms de atraso)
    const startedAt = performance.now()
    let cancelled = false
    let attempts = 0
    const fitSplash = () => {
      if (cancelled || intro.dataset.splashFit === '1') return
      const timeline = gsap
        .getTweensOf(intro)
        .map((tween) => tween.parent)
        .find((parent) => parent !== null)
      if (timeline) {
        intro.dataset.splashFit = '1'
        const elapsed = timeline.time()
        const remaining = timeline.totalDuration() - elapsed
        // mira terminar 80 ms antes do orçamento (folga de ticker); se já não
        // couber nem isso, corta na hora
        const budget = SPLASH_MAX_S - (performance.now() - startedAt) / 1000 - 0.08
        if (budget < 0.15) {
          cut()
          return
        }
        if (remaining > budget) timeline.timeScale(remaining / budget)
        return
      }
      if (attempts < 60) {
        attempts += 1
        window.setTimeout(fitSplash, 25)
      }
    }
    fitSplash()

    return () => {
      cancelled = true
      window.clearTimeout(hardCut)
      window.clearTimeout(failSafe)
      doc.classList.remove('brand-intro-lock')
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className="brand-intro"
      id="brandIntro"
      aria-hidden="true"
      data-brand-intro
    >
      <div className="brand-intro__inner">
        <div className="brand-intro__mark">
          <img
            src={assetUrl('/monogram.svg')}
            alt=""
            width={96}
            height={96}
            data-brand-mark
            decoding="async"
          />
          <span className="brand-intro__ring" data-brand-ring />
        </div>
        <p className="brand-intro__name" data-brand-name>
          <span className="luxury-line">
            <span className="luxury-line__in">Filipe</span>
          </span>
          <span className="luxury-line luxury-line--accent">
            <span className="luxury-line__in">Studio</span>
          </span>
        </p>
        <span className="brand-intro__rule" data-brand-rule />
      </div>
    </div>
  )
}
