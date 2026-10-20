import { useEffect } from 'react'

/**
 * Parallax do fundo pelo movimento do mouse.
 * Aplica --mx/--my (normalizado -1..1) na raiz; CSS consome nos orbes/cubos/hero.
 */
export function useMouseParallax(trigger?: unknown): void {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    let raf = 0
    let targetX = 0
    let targetY = 0
    let curX = 0
    let curY = 0

    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth
      const h = window.innerHeight
      targetX = (e.clientX / w) * 2 - 1
      targetY = (e.clientY / h) * 2 - 1
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const tick = () => {
      curX += (targetX - curX) * 0.08
      curY += (targetY - curY) * 0.08

      const root = document.documentElement
      root.style.setProperty('--mx', curX.toFixed(4))
      root.style.setProperty('--my', curY.toFixed(4))

      if (Math.abs(targetX - curX) > 0.001 || Math.abs(targetY - curY) > 0.001) {
        raf = requestAnimationFrame(tick)
      } else {
        raf = 0
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [trigger])
}
