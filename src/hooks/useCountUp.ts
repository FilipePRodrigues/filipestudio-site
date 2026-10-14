import { useEffect, useRef, useState } from 'react'

export function useCountUp(target: number, durationMs = 1400): number {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement | null>(null)
  const started = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started.current) {
            started.current = true
            const start = performance.now()
            const tick = (now: number) => {
              const progress = Math.min((now - start) / durationMs, 1)
              const eased = 1 - Math.pow(1 - progress, 3)
              setValue(Math.round(target * eased))
              if (progress < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
            observer.disconnect()
          }
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [target, durationMs])

  return value
}

// Companion hook to expose a ref for the counter element
export function useCountUpRef() {
  return useRef<HTMLSpanElement | null>(null)
}
