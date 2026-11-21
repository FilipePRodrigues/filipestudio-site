import { useEffect, useRef } from 'react'
import { assetUrl } from '../lib/asset.ts'

/**
 * Logo redonda do hero.
 * Entrada 3D + distort líquido no hover (estilo Museum of Motion / Distort),
 * via filtro SVG feTurbulence + feDisplacementMap. Sem WebGL pesado.
 */
export function HeroLogo() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null)
  const dispRef = useRef<SVGFEDisplacementMapElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const disp = dispRef.current
    const turb = turbulenceRef.current
    if (!wrap || !disp || !turb) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    let targetScale = 0
    let currentScale = 0
    let targetFreq = 0.015
    let currentFreq = 0.015
    let raf = 0
    let running = false
    let lastX = 0
    let lastY = 0
    let lastT = 0

    const tick = () => {
      currentScale += (targetScale - currentScale) * 0.14
      currentFreq += (targetFreq - currentFreq) * 0.12
      disp.setAttribute('scale', currentScale.toFixed(2))
      turb.setAttribute('baseFrequency', `${currentFreq.toFixed(4)} ${currentFreq.toFixed(4)}`)
      if (Math.abs(targetScale - currentScale) > 0.05 || currentScale > 0.1) {
        raf = requestAnimationFrame(tick)
      } else {
        disp.setAttribute('scale', '0')
        running = false
        raf = 0
      }
    }

    const ensure = () => {
      if (!running) {
        running = true
        raf = requestAnimationFrame(tick)
      }
    }

    const onMove = (e: PointerEvent) => {
      const now = performance.now()
      const dt = Math.max(16, now - lastT)
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      const speed = Math.min(1, Math.hypot(dx, dy) / dt)
      lastX = e.clientX
      lastY = e.clientY
      lastT = now

      // velocidade + posição → intensidade do líquido (forte)
      targetScale = 14 + speed * 48
      const r = wrap.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      targetFreq = 0.012 + px * 0.022 + py * 0.016 + speed * 0.012
      ensure()
    }

    const onLeave = () => {
      targetScale = 0
      targetFreq = 0.015
      ensure()
    }

    wrap.addEventListener('pointermove', onMove)
    wrap.addEventListener('pointerleave', onLeave)
    wrap.addEventListener('pointerenter', () => {
      lastT = performance.now()
    })

    return () => {
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={wrapRef} className="hero-logo" data-hero-logo>
      <svg className="hero-logo__svg-defs" aria-hidden="true" width="0" height="0">
        <defs>
          <filter id="logoDistort" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0.02 0.02"
              numOctaves={2}
              seed={4}
              result="noise"
            />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="noise"
              scale={0}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div className="hero-logo__orbit" aria-hidden="true">
        <span className="hero-logo__orbit-ring" />
        <span className="hero-logo__orbit-ring hero-logo__orbit-ring--2" />
      </div>

      <div className="hero-logo__disc" data-image-zoom>
        <div className="hero-logo__face">
          <img
            src={assetUrl('/monogram.svg')}
            alt="Símbolo FilipeStudio"
            width={280}
            height={280}
            className="hero-logo__mark"
            draggable={false}
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div className="hero-logo__glow" aria-hidden="true" />
      </div>

      <div className="hero-logo__badges" aria-hidden="true">
        <span className="hero-chip hero-chip--logo1">
          <span className="text-roxo">⚡</span> PageSpeed 98/100
        </span>
        <span className="hero-chip hero-chip--logo2">
          <span className="text-ciano">◆</span> Design exclusivo
        </span>
      </div>
    </div>
  )
}
