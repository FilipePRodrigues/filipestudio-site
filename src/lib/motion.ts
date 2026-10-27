import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return true
  if (document.documentElement.dataset.motion === 'reduced') return true
  if (document.documentElement.dataset.motion === 'full') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function isCoarsePointer(): boolean {
  return window.matchMedia('(pointer: coarse)').matches
}

/** Inicializa uma única vez o pacote Luxury (GSAP). */
let luxuryReady = false

export function initLuxuryMotion(): () => void {
  if (luxuryReady) return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  luxuryReady = true

  if (prefersReducedMotion()) {
    document.querySelectorAll<HTMLElement>('.reveal, .luxury-title').forEach((el) => {
      el.classList.add('is-visible')
      el.style.opacity = '1'
      el.style.transform = 'none'
    })
    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }

  setupTitleMasks()
  // dica "Role para continuar" no hero
  {
    const hint = document.getElementById('heroScrollHint')
    if (hint) {
      const show = () => hint.classList.toggle('is-visible', window.scrollY < 48)
      show()
      window.addEventListener('scroll', show, { passive: true })
    }
  }
  const brandIntroWillPlay = setupBrandIntro()
  if (!brandIntroWillPlay) {
    setupHeroIntro()
  }
  setupScrubStatements()
  setupFlightScene()
  setupCountUp()
  setupPressFeedback()
  setupImageZoom()
  setupUnderlineSweep()
  setupImageReveal()
  setupSpotlight()
  setupVelocitySkew()
  setupParallaxDepth()
  setupPullQuote()
  setupIconFlight()

  return () => {
    ScrollTrigger.getAll().forEach((t) => t.kill())
    luxuryReady = false
  }
}

/* ---------- Brand intro: logo entra estilo Luxury ---------- */
function setupBrandIntro(): boolean {
  const intro = document.querySelector<HTMLElement>('[data-brand-intro]')
  if (!intro || intro.dataset.done === '1') return false
  intro.dataset.done = '1'

  const mark = intro.querySelector<HTMLElement>('[data-brand-mark]')
  const ring = intro.querySelector<HTMLElement>('[data-brand-ring]')
  const nameLines = intro.querySelectorAll<HTMLElement>('.luxury-line__in')
  const rule = intro.querySelector<HTMLElement>('[data-brand-rule]')
  const doc = document.documentElement

  if (prefersReducedMotion()) {
    intro.classList.add('is-done')
    intro.style.display = 'none'
    return false
  }

  doc.classList.add('brand-intro-lock')

  // Esconde o hero já na intro para não "piscar" quando o painel sai
  const heroRoot = document.querySelector<HTMLElement>('[data-hero-intro]')
  const heroParts = heroRoot?.querySelectorAll<HTMLElement>('[data-hero-part]') ?? []
  gsap.set(heroParts, { opacity: 0, y: 28 })
  if (heroRoot) heroRoot.dataset.done = '0'

  gsap.set(mark, { scale: 0.55, opacity: 0, filter: 'blur(10px)' })
  gsap.set(ring, { scale: 0.4, opacity: 0, rotation: -40 })
  gsap.set(nameLines, { yPercent: 120, opacity: 0 })
  gsap.set(rule, { scaleX: 0 })

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    onComplete: () => {
      doc.classList.remove('brand-intro-lock')
      intro.classList.add('is-done')
      intro.style.display = 'none'
      // Conteúdo do hero só entra uma vez, depois da intro
      setupHeroIntro(true)
      ScrollTrigger.refresh()
    },
  })

  tl.to(ring, { scale: 1, opacity: 1, rotation: 0, duration: 0.7, ease: 'power2.out' }, 0.05)
  tl.to(
    mark,
    { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.75, ease: 'power3.out' },
    0.12,
  )
  tl.fromTo(
    ring,
    { boxShadow: '0 0 0 rgba(124,58,237,0)' },
    {
      boxShadow: '0 0 36px rgba(124,58,237,0.55), inset 0 0 28px rgba(34,211,238,0.18)',
      duration: 0.5,
      yoyo: true,
      repeat: 1,
    },
    0.45,
  )
  tl.to(
    nameLines,
    { yPercent: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: 'power3.out' },
    0.55,
  )
  tl.to(rule, { scaleX: 1, duration: 0.55, ease: 'power2.inOut' }, 0.85)
  tl.to(
    intro,
    {
      yPercent: -100,
      duration: 0.75,
      ease: 'power3.inOut',
      onComplete: () => {
        intro.style.visibility = 'hidden'
      },
    },
    1.55,
  )

  return true
}

/* ---------- Hero: entrada escalonada (Luxury) ---------- */
function setupHeroIntro(force = false): void {
  const root = document.querySelector<HTMLElement>('[data-hero-intro]')
  if (!root) return
  if (root.dataset.done === '1' && !force) return
  root.dataset.done = '1'

  const parts = root.querySelectorAll<HTMLElement>('[data-hero-part]')
  if (!parts.length) return

  const delay = force ? 0.08 : 0.15
  gsap.fromTo(
    parts,
    { y: 28, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.12,
      delay,
      overwrite: 'auto',
      // garante estado final mesmo se interromper
      onComplete: () => {
        gsap.set(parts, { clearProps: 'transform' })
        parts.forEach((p) => {
          p.style.opacity = '1'
        })
      },
    },
  )
}

/* ---------- Títulos: linha sobe de trás da máscara ---------- */
function setupTitleMasks(): void {
  document.querySelectorAll<HTMLElement>('.luxury-title').forEach((title) => {
    if (title.dataset.split === '1') return
    const html = title.innerHTML
    // preserva <br> como fim de linha visual
    const parts = html.split(/<br\s*\/?>/i)
    title.innerHTML = parts
      .map(
        (line) =>
          `<span class="luxury-line"><span class="luxury-line__in">${line.trim()}</span></span>`,
      )
      .join('')
    title.dataset.split = '1'
    title.classList.add('is-ready')

    const lines = title.querySelectorAll<HTMLElement>('.luxury-line__in')
    gsap.set(lines, { yPercent: 115, opacity: 0 })

    ScrollTrigger.create({
      trigger: title,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(lines, {
          yPercent: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          overwrite: 'auto',
        })
        title.classList.add('is-visible')
      },
    })
  })
}

/* ---------- scrubStatement: palavras acendem ao ler ---------- */
function setupScrubStatements(): void {
  document.querySelectorAll<HTMLElement>('[data-scrub-statement]').forEach((el) => {
    if (el.dataset.split === '1') return
    const text = el.textContent?.trim() || ''
    const words = text.split(/\s+/)
    el.innerHTML = words.map((w) => `<span class="scrub-word">${w}</span>`).join(' ')
    el.dataset.split = '1'
    el.setAttribute('aria-label', text)

    const spans = el.querySelectorAll<HTMLElement>('.scrub-word')
    gsap.set(spans, { opacity: 0.15 })

    gsap.to(spans, {
      opacity: 1,
      ease: 'none',
      stagger: 0.08,
      scrollTrigger: {
        trigger: el,
        start: 'top 75%',
        end: 'bottom 40%',
        scrub: 0.6,
      },
    })
  })
}

/* ---------- flight: câmera em espiral entre as artes ---------- */
function setupFlightScene(): void {
  const section = document.querySelector<HTMLElement>('[data-flight-section]')
  if (!section) return
  const track = section.querySelector<HTMLElement>('[data-flight-track]')
  const lean = section.querySelector<HTMLElement>('[data-flight-lean]')
  const scene = section.querySelector<HTMLElement>('[data-flight-scene]')
  const cards = section.querySelectorAll<HTMLElement>('[data-flight-card]')
  if (!track || !scene || !cards.length) return

  // Celular: grade estática, sem pin
  if (isCoarsePointer() || window.innerWidth < 768) {
    section.classList.add('flight--static')
    return
  }

  // Pausa o túnel (CSS) quando a seção está fora da tela — evita repaint à toa
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      ([entry]) => {
        section.classList.toggle('is-idle', !entry.isIntersecting)
      },
      { threshold: 0 },
    )
    io.observe(section)
  }

  const count = cards.length
  const spacing = 340
  const travel = (count - 1) * spacing + 200

  const tunnel = section.querySelector<HTMLElement>('.flight__tunnel')
  const header = section.querySelector<HTMLElement>('.flight__header')
  const field = section.querySelector<HTMLElement>('.flight__field')

  // Um único onUpdate para z + saída (scrub travado no scroll).
  // Sem proxy/lerp: em scroll rápido não "acorda" em salto (a travada na saída).
  let lastExit = -1
  ScrollTrigger.create({
    trigger: track,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      const p = self.progress
      const exit = Math.max(0, (p - 0.68) / 0.32)
      const op = 1 - Math.min(1, exit * 1.05)

      gsap.set(scene, {
        z: p * travel,
        scale: 1 - exit * 0.1,
        opacity: exit > 0 ? Math.max(0, 1 - exit * 1.1) : 1,
        force3D: true,
      })

      // só grava opacity quando muda de verdade
      const next = Math.round(op * 100) / 100
      if (next !== lastExit) {
        lastExit = next
        if (tunnel) tunnel.style.opacity = String(next)
        if (header) header.style.opacity = String(next)
        if (field) field.style.opacity = String(Math.max(next, 0.001))
      }
    },
  })

  if (isCoarsePointer() || prefersReducedMotion() || !lean) return

  let mx = 0
  let my = 0
  let sx = 0
  let sy = 0
  let active = false

  const tick = () => {
    sx += (mx - sx) * 0.06
    sy += (my - sy) * 0.06
    lean.style.setProperty('--lean-y', `${(sx * 8).toFixed(2)}deg`)
    lean.style.setProperty('--lean-x', `${(-sy * 5).toFixed(2)}deg`)
    if (Math.abs(mx - sx) > 0.002 || Math.abs(my - sy) > 0.002) {
      requestAnimationFrame(tick)
    } else {
      active = false
    }
  }

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    const r = section.getBoundingClientRect()
    mx = ((e.clientX - r.left) / r.width) * 2 - 1
    my = ((e.clientY - r.top) / r.height) * 2 - 1
    if (!active) {
      active = true
      requestAnimationFrame(tick)
    }
  }

  const onLeave = () => {
    mx = 0
    my = 0
    if (!active) {
      active = true
      requestAnimationFrame(tick)
    }
  }

  section.addEventListener('pointermove', onMove, { passive: true })
  section.addEventListener('pointerleave', onLeave)
}

/* ---------- countUp nas métricas ---------- */
function setupCountUp(): void {
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const raw = el.dataset.count || ''
    const target = Number(raw.replace(/[^\d.]/g, ''))
    if (!Number.isFinite(target)) return
    const suffix = el.dataset.suffix || raw.replace(/[\d.,]+/g, '')
    const prefix = el.dataset.prefix || ''
    const obj = { v: 0 }

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'power3.out',
          onUpdate: () => {
            const n = target % 1 === 0 ? Math.round(obj.v) : obj.v.toFixed(1)
            el.textContent = `${prefix}${n}${suffix}`
          },
        })
      },
    })
  })
}

/* ---------- pressFeedback nos botões ---------- */
function setupPressFeedback(): void {
  if (isCoarsePointer()) return
  document.querySelectorAll<HTMLElement>('.btn-primary, .btn-secondary, .btn').forEach((btn) => {
    btn.addEventListener('pointerdown', () => {
      if (prefersReducedMotion()) return
      gsap.to(btn, { scale: 0.94, duration: 0.12, ease: 'power2.out', overwrite: 'auto' })
    })
    const release = () => {
      if (prefersReducedMotion()) return
      gsap.to(btn, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.45)', overwrite: 'auto' })
    }
    btn.addEventListener('pointerup', release)
    btn.addEventListener('pointerleave', release)
    btn.addEventListener('pointercancel', release)
  })
}

/* ---------- imageZoom nas miniaturas ---------- */
function setupImageZoom(): void {
  document.querySelectorAll<HTMLElement>('[data-image-zoom]').forEach((frame) => {
    const img = frame.querySelector('img')
    if (!img) return
    gsap.set(img, { scale: 1 })
    frame.addEventListener('pointerenter', () => {
      if (prefersReducedMotion()) return
      gsap.to(img, { scale: 1.05, duration: 0.6, ease: 'power2.out', overwrite: 'auto' })
    })
    frame.addEventListener('pointerleave', () => {
      if (prefersReducedMotion()) return
      gsap.to(img, { scale: 1, duration: 0.6, ease: 'power2.out', overwrite: 'auto' })
    })
  })
}

/* ---------- underlineSweep nos links de nav e CTA ---------- */
function setupUnderlineSweep(): void {
  document.querySelectorAll<HTMLElement>('[data-underline-sweep]').forEach((link) => {
    if (link.querySelector('.sweep-line')) return
    const line = document.createElement('span')
    line.className = 'sweep-line'
    line.setAttribute('aria-hidden', 'true')
    link.appendChild(line)
  })
}

/* ---------- imageReveal: foto abre de uma fresta ---------- */
function setupImageReveal(): void {
  document.querySelectorAll<HTMLElement>('[data-image-reveal]').forEach((frame) => {
    if (frame.dataset.revealed === '1') return
    gsap.set(frame, { clipPath: 'inset(0% 42% 0% 42%)' })
    const img = frame.querySelector('img')
    if (img) gsap.set(img, { scale: 1.12 })

    ScrollTrigger.create({
      trigger: frame,
      start: 'top 82%',
      once: true,
      onEnter: () => {
        frame.dataset.revealed = '1'
        gsap.to(frame, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1,
          ease: 'power3.inOut',
          overwrite: 'auto',
        })
        if (img) {
          gsap.to(img, { scale: 1, duration: 1.1, ease: 'power2.out', overwrite: 'auto' })
        }
      },
    })
  })
}

/* ---------- spotlight: luz que acha o detalhe ---------- */
function setupSpotlight(): void {
  if (isCoarsePointer()) return
  document.querySelectorAll<HTMLElement>('[data-spotlight]').forEach((el) => {
    if (el.querySelector('.spotlight-layer')) return
    const layer = document.createElement('div')
    layer.className = 'spotlight-layer'
    layer.setAttribute('aria-hidden', 'true')
    el.appendChild(layer)

    el.addEventListener('pointermove', (e) => {
      if (prefersReducedMotion()) return
      const r = el.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width) * 100
      const y = ((e.clientY - r.top) / r.height) * 100
      layer.style.setProperty('--spot-x', `${x}%`)
      layer.style.setProperty('--spot-y', `${y}%`)
      layer.classList.add('is-on')
    })
    el.addEventListener('pointerleave', () => layer.classList.remove('is-on'))
    el.addEventListener('focusin', () => {
      layer.style.setProperty('--spot-x', '50%')
      layer.style.setProperty('--spot-y', '50%')
      layer.classList.add('is-on')
    })
    el.addEventListener('focusout', () => layer.classList.remove('is-on'))
  })
}

/* ---------- velocitySkew: colunas de mídia inclinam com a rolagem ---------- */
function setupVelocitySkew(): void {
  if (isCoarsePointer() || prefersReducedMotion()) return
  const targets = document.querySelectorAll<HTMLElement>('[data-velocity-skew]')
  if (!targets.length) return

  let lastY = window.scrollY
  let lastT = performance.now()
  let current = 0
  let raf = 0

  const tick = () => {
    const now = performance.now()
    const y = window.scrollY
    const dt = Math.max(16, now - lastT)
    const v = (y - lastY) / dt
    lastY = y
    lastT = now
    const targetSkew = Math.max(-8, Math.min(8, v * 18))
    current += (targetSkew - current) * 0.12
    targets.forEach((el) => {
      el.style.setProperty('--skew', `${current.toFixed(2)}deg`)
    })
    raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)

  // cleanup via pagehide leve
  window.addEventListener(
    'pagehide',
    () => {
      cancelAnimationFrame(raf)
    },
    { once: true },
  )
}

/* ---------- parallax: profundidade discreta entre camadas ---------- */
function setupParallaxDepth(): void {
  if (prefersReducedMotion()) return

  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const dist = Number(el.dataset.parallax) || 40
    gsap.fromTo(
      el,
      { y: -dist * 0.35 },
      {
        y: dist * 0.65,
        ease: 'none',
        scrollTrigger: {
          trigger: el.closest('section') || el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      },
    )
  })
}

/* ---------- pull quote: destaque editorial com barra ---------- */
function setupPullQuote(): void {
  document.querySelectorAll<HTMLElement>('[data-pull-quote]').forEach((el) => {
    if (el.dataset.ready === '1') return
    el.dataset.ready = '1'
    const bar = document.createElement('span')
    bar.className = 'pull-quote__bar'
    bar.setAttribute('aria-hidden', 'true')
    el.insertBefore(bar, el.firstChild)

    gsap.set(el, { opacity: 0, x: -24 })
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(el, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' })
        gsap.fromTo(
          bar,
          { scaleY: 0 },
          { scaleY: 1, duration: 0.8, ease: 'power2.out', transformOrigin: 'top' },
        )
      },
    })
  })
}

/* ---------- Flight: ícones pixelados voam até o card ---------- */
function setupIconFlight(): void {
  const icons = document.querySelectorAll<HTMLElement>('[data-flight-icon]')
  if (!icons.length) return

  icons.forEach((icon, i) => {
    if (icon.dataset.flown === '1') return

    // espiral discreta: lado alterna, como pôsteres ao longo de uma curva
    const side = i % 2 === 0 ? 1 : -1
    const fromX = side * (40 + (i % 4) * 18)
    const fromZ = -420 - (i % 3) * 80
    const rotY = side * -55
    const rotX = 18 - (i % 3) * 8

    gsap.set(icon, {
      x: fromX,
      z: fromZ,
      rotationY: rotY,
      rotationX: rotX,
      scale: 0.35,
      opacity: 0,
      filter: 'blur(6px)',
      transformPerspective: 900,
      transformOrigin: '50% 50%',
    })

    gsap.to(icon, {
      x: 0,
      z: 0,
      rotationY: 0,
      rotationX: 0,
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.05,
      ease: 'power3.out',
      delay: (i % 6) * 0.07,
      scrollTrigger: {
        trigger: icon.closest('section') || icon,
        start: 'top 78%',
        once: true,
        onEnter: () => {
          icon.dataset.flown = '1'
        },
      },
      overwrite: 'auto',
    })
  })

  // lean: o grupo inteiro inclina levemente com o mouse (como a câmera do Flight)
  if (isCoarsePointer()) return
  const sections = new Set<HTMLElement>()
  icons.forEach((icon) => {
    const sec = icon.closest('section')
    if (sec) sections.add(sec as HTMLElement)
  })

  sections.forEach((section) => {
    const group = section.querySelectorAll<HTMLElement>('[data-flight-icon]')
    let mx = 0
    let my = 0
    let sx = 0
    let sy = 0
    let active = false

    const tick = () => {
      sx += (mx - sx) * 0.08
      sy += (my - sy) * 0.08
      group.forEach((el) => {
        if (el.dataset.flown !== '1') return
        el.style.setProperty('--lean-y', `${(sx * 8).toFixed(2)}deg`)
        el.style.setProperty('--lean-x', `${(-sy * 6).toFixed(2)}deg`)
      })
      if (Math.abs(mx - sx) > 0.001 || Math.abs(my - sy) > 0.001) {
        requestAnimationFrame(tick)
      } else {
        active = false
      }
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const r = section.getBoundingClientRect()
      mx = ((e.clientX - r.left) / r.width) * 2 - 1
      my = ((e.clientY - r.top) / r.height) * 2 - 1
      if (!active) {
        active = true
        requestAnimationFrame(tick)
      }
    }

    const onLeave = () => {
      mx = 0
      my = 0
      if (!active) {
        active = true
        requestAnimationFrame(tick)
      }
    }

    section.addEventListener('pointermove', onMove, { passive: true })
    section.addEventListener('pointerleave', onLeave)
  })
}
