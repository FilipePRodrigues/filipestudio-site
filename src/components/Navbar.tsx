import { useEffect, useState } from 'react'
import { BRAND, NAV_LINKS } from '../data/content.ts'
import { assetUrl } from '../lib/asset.ts'
import { ThemeToggle } from './ThemeToggle.tsx'

interface NavbarProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
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

  const closeMenu = () => setOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Navegação principal"
          className={`mt-3 flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 backdrop-blur-xl transition-all duration-300 ${
            scrolled
              ? 'shadow-soft bg-white/80 dark:bg-ink-900/85'
              : 'bg-white/70 dark:bg-ink-900/70'
          }`}
        >
          <a href="#topo" className="group flex items-center gap-2.5" onClick={closeMenu}>
            <img
              src={assetUrl('/favicon.svg')}
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 rounded-xl shadow-glow"
            />
            <span className="font-display text-lg font-semibold tracking-tight">
              {BRAND.name}
              <span className="bg-gradient-to-r from-neon-cyan to-neon-violet bg-clip-text text-transparent">
                {BRAND.nameSuffix}
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="nav-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <a
              href="#contato"
              className="btn-primary hidden px-4 py-2.5 text-sm sm:inline-flex"
            >
              Solicitar orçamento
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 lg:hidden dark:border-white/10 dark:text-slate-200"
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

        <div
          id="mobile-menu"
          hidden={!open}
          className="mt-2 rounded-2xl border border-white/10 bg-white/95 p-4 shadow-soft backdrop-blur-xl lg:hidden dark:bg-ink-850/95"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="mobile-nav-link" onClick={closeMenu}>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contato"
                className="mobile-nav-link mt-2 block rounded-xl bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-violet px-4 py-3 text-center font-semibold text-ink-950"
                onClick={closeMenu}
              >
                Solicitar orçamento
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
