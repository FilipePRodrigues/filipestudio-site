import { useEffect, useRef, useState } from 'react'

/**
 * Cursor custom: ponto instantâneo + halo com delay.
 * Escondido em touch / reduced-motion.
 */
export function CursorFX() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    setEnabled(true)
    document.documentElement.classList.add('has-custom-cursor')

    const dot = { x: -100, y: -100 }
    const ring = { x: -100, y: -100 }
    let raf = 0
    let hovering = false

    const onMove = (e: MouseEvent) => {
      dot.x = e.clientX
      dot.y = e.clientY
      const t = e.target
      hovering = Boolean(
        t instanceof Element &&
          t.closest('a, button, [role="button"], input, textarea, select, summary'),
      )
    }

    const tick = () => {
      // delay suave do halo
      ring.x += (dot.x - ring.x) * 0.16
      ring.y += (dot.y - ring.y) * 0.16

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`
        ringRef.current.dataset.hover = hovering ? 'true' : 'false'
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [])

  if (!enabled) return null

  return (
    <div className="cursor-fx" aria-hidden="true">
      <div ref={ringRef} className="cursor-fx__ring" data-hover="false" />
      <div ref={dotRef} className="cursor-fx__dot" />
    </div>
  )
}
