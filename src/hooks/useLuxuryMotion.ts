import { useEffect } from 'react'
import { initLuxuryMotion } from '../lib/motion.ts'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Ativa o pacote Luxury (GSAP) na home.
 * Limpa ScrollTriggers ao trocar de rota.
 */
export function useLuxuryMotion(routeName: string): void {
  useEffect(() => {
    if (routeName !== 'home') return
    const timer = window.setTimeout(() => {
      initLuxuryMotion()
      window.requestAnimationFrame(() => ScrollTrigger.refresh())
    }, 120)
    return () => {
      window.clearTimeout(timer)
      if (routeName !== 'home') ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [routeName])
}
