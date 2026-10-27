import { useEffect, useMemo, useState, type CSSProperties } from 'react'

/**
 * Spell UI — Light Rays (versão leve).
 * Feixes de luz diagonais em CSS, sem three.js. Mesmo clima do original,
 * custo de GPU muito menor. Pausa fora da tela e some em reduced-motion/mobile.
 */

interface LightRaysProps {
  intensity?: number
  rays?: number
  /** cor primária dos feixes */
  color1?: string
  /** cor secundária */
  color2?: string
  className?: string
  style?: CSSProperties
  /** posição horizontal da origem dos feixes (0–100) */
  position?: number
}

export function LightRays({
  intensity = 13,
  rays = 14,
  color1 = '#7C3AED',
  color2 = '#22D3EE',
  position = 50,
  className = '',
  style,
}: LightRaysProps) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(max-width: 760px)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    setEnabled(true)
  }, [])

  const beamList = useMemo(() => {
    const n = Math.max(4, Math.min(rays, 24))
    return Array.from({ length: n }, (_, i) => {
      const spread = ((i / (n - 1)) - 0.5) * 140
      const delay = (i * 0.35) % 4
      const dur = 4 + (i % 5) * 0.6
      const width = 22 + ((i * 7) % 24)
      const opacity = 0.06 + ((i * 11) % 8) / 100 + (intensity / 100) * 0.06
      return { spread, delay, dur, width, opacity, i }
    })
  }, [rays, intensity])

  if (!enabled) return null

  return (
    <div
      aria-hidden="true"
      className={`light-rays ${className}`}
      style={{
        ['--rays-x' as string]: `${position}%`,
        ...style,
      }}
    >
      {beamList.map((beam) => (
        <span
          key={beam.i}
          className="light-rays__beam"
          style={{
            left: `calc(var(--rays-x) + ${beam.spread * 0.35}%)`,
            width: `${beam.width}px`,
            opacity: beam.opacity,
            animationDelay: `${beam.delay}s`,
            animationDuration: `${beam.dur}s`,
            background: `linear-gradient(180deg, transparent 0%, ${beam.i % 2 === 0 ? color1 : color2} 35%, ${beam.i % 2 === 0 ? color2 : color1} 70%, transparent 100%)`,
          }}
        />
      ))}
      <div className="light-rays__glow" style={{ background: `radial-gradient(ellipse 50% 40% at var(--rays-x) 100%, ${color1}33, transparent 70%)` }} />
    </div>
  )
}

export default LightRays
