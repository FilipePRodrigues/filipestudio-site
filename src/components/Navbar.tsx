import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { BRAND, NAV_LINKS } from '../data/content.ts'
import { assetUrl } from '../lib/asset.ts'
import { ThemeToggle } from './ThemeToggle.tsx'

interface NavbarProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

const ALL_LINKS = [
  ...NAV_LINKS,
  { href: '#/blog', label: 'Blog ↗' },
]

const pad = (n: number) => String(n).padStart(2, '0')

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>('')
  const burgerRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const wasOpen = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)

      // seção ativa por scroll (só rotas home)
      if (window.location.hash.startsWith('#/')) {
        setActive('')
        return
      }
      let current = ''
      for (const link of NAV_LINKS) {
        const id = link.href.replace('#', '')
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top <= 120) current = link.href
      }
      setActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // menu mobile: foco inicial, fechamento por Esc e ciclo de Tab contido no overlay
  useEffect(() => {
    if (!open) {
      if (wasOpen.current) {
        wasOpen.current = false
        burgerRef.current?.focus()
      }
      return
    }
    wasOpen.current = true
    closeRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setOpen(false)
        return
      }
      if (e.key !== 'Tab') return
      const menu = menuRef.current
      if (!menu) return
      const focusables = Array.from(
        menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const current = document.activeElement
      if (e.shiftKey && current === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && current === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <>
      {/* régua de assinatura (topo) — fase-2 §5/01 */}
      <div className="chrome-brand-rule" aria-hidden="true" />

      <header className="chrome-nav">
        <nav
          aria-label="Navegação principal"
          className={`chrome-bar${scrolled ? ' chrome-bar--scrolled' : ''}`}
        >
          <a href="#topo" className="chrome-brand" onClick={closeMenu} aria-label="FilipeStudio — início">
            <img
              src={assetUrl('/monogram.svg')}
              alt=""
              width={36}
              height={36}
              className="nav-logo"
            />
            <span className="chrome-brand__name">
              {BRAND.name}
              <span className="chrome-brand__suffix">{BRAND.nameSuffix}</span>
            </span>
          </a>

          <ul className="chrome-links">
            {ALL_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-underline-sweep
                  className={`nav-link${link.href === '#/blog' ? ' nav-blog' : ''}${
                    active === link.href ? ' nav-link--active' : ''
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="chrome-actions">
            <span className="chrome-toggle">
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            </span>
            <a href="#contato" data-underline-sweep className="nav-cta" onClick={closeMenu}>
              Contato
            </a>
            <button
              ref={burgerRef}
              type="button"
              className="nav-burger"
              aria-label={open ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                {open ? (
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* menu mobile — overlay com itens numerados 01…08 (fase-2 §7) */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`chrome-menu${open ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
      >
        <div className="chrome-menu__head">
          <a
            href="#topo"
            className="chrome-menu__brand"
            onClick={closeMenu}
            aria-label="FilipeStudio — início"
          >
            <img src={assetUrl('/monogram.svg')} alt="" width={38} height={38} className="chrome-menu__logo" />
            <span className="chrome-brand__name">
              {BRAND.name}
              <span className="chrome-brand__suffix">{BRAND.nameSuffix}</span>
            </span>
          </a>
          <button ref={closeRef} type="button" className="chrome-menu__close" onClick={closeMenu}>
            [ fechar ]
          </button>
        </div>

        <ul className="chrome-menu__list">
          {ALL_LINKS.map((link, i) => (
            <li
              key={link.href}
              className="chrome-menu__item"
              style={{ '--i': i } as CSSProperties}
            >
              <a
                href={link.href}
                className={`mobile-nav-link chrome-menu__link${active === link.href ? ' is-active' : ''}`}
                onClick={closeMenu}
              >
                <span className="chrome-menu__num">{pad(i + 1)}</span>
                {link.label}
              </a>
            </li>
          ))}
          <li
            className="chrome-menu__item chrome-menu__item--cta"
            style={{ '--i': ALL_LINKS.length } as CSSProperties}
          >
            <a href="#contato" className="mobile-nav-link chrome-menu__cta" onClick={closeMenu}>
              <span className="chrome-menu__num">{pad(ALL_LINKS.length + 1)}</span>
              Contato
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
