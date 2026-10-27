import type { CSSProperties, ReactNode } from 'react'

/**
 * Spell UI — ShimmerText (adaptado).
 * Brilho que varre o texto, só com CSS (sem lib de animação).
 */

interface ShimmerTextProps {
  children: ReactNode
  className?: string
  duration?: number
  style?: CSSProperties
}

export function ShimmerText({ children, className = '', duration = 4, style }: ShimmerTextProps) {
  return (
    <span
      className={`shimmer-text ${className}`}
      style={{ ['--shimmer-duration' as string]: `${duration}s`, ...style }}
    >
      {children}
    </span>
  )
}

export default ShimmerText
