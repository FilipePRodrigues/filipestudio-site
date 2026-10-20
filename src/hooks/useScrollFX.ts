import { useEffect } from 'react'

type ParallaxEl = HTMLElement & { _parallaxSpeed?: number }

function readSpeed(el: HTMLElement): number {
  const raw = el.dataset.parallax
  const parsed = raw ? Number.parseFloat(raw) : Number.NaN
  return Number.isFinite(parsed) ? parsed : 0.2
}

/**
 * Scroll FX: parallax em camadas, reação do hero à rolagem
 * e progresso 3D — só transform/opacity, com rAF.
 */
export function useScrollFX(trigger?: unknown): void {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const parallaxEls: ParallaxEl[] = []
    let scene: HTMLElement | null = null
    let progress: HTMLElement | null = null
    let progressFill: HTMLElement | null = null

    const collect = () => {
      parallaxEls.length = 0
      document.querySelectorAll<ParallaxEl>('[data-parallax]').forEach((el) => {
        el._parallaxSpeed = readSpeed(el)
        parallaxEls.push(el)
      })
      scene = document.querySelector('.hero-stage__scene')
      progress = document.querySelector('.scroll-progress')
      progressFill = document.querySelector('.scroll-progress__fill')
    }

    const apply = () => {
      frame = 0
      const y = window.scrollY
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const t = Math.min(1, Math.max(0, y / max))

      for (const el of parallaxEls) {
        const speed = el._parallaxSpeed ?? 0.2
        // combina com o parallax do mouse via CSS (`--sy` + `--mx/--my`)
        el.style.setProperty('--sy', `${(y * speed * -0.35).toFixed(2)}px`)
      }

      if (scene) {
        const heroT = Math.min(1, y / (window.innerHeight * 0.9))
        scene.style.transform = `rotateX(${8 - heroT * 4}deg) rotateY(${-14 + heroT * 6}deg) rotateZ(${1 - heroT * 0.6}deg) translateY(${heroT * -20}px)`
        scene.style.animation = 'none'
      }

      if (progress && progressFill) {
        progress.style.setProperty('--scroll', String(t))
        progressFill.style.transform = `scaleY(${t})`
        progress.setAttribute('data-active', y > 240 ? 'true' : 'false')
      }
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply)
    }

    collect()
    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [trigger])
}
