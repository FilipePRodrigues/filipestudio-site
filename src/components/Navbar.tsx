import { useEffect, useState } from 'react'
import { BRAND, NAV_LINKS } from '../data/content.ts'
import { assetUrl } from '../lib/asset.ts'
import { ThemeToggle } from './ThemeToggle.tsx'

interface NavbarProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

const ALL_LINKS = [
  ...NAV_LINKS,
  { href: '#/blog', label: 'Blog' },
]

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>('')

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

  const closeMenu = () => setOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Navegação principal"
          className={`nav-shell mt-3 flex items-center justify-between border-2 border-black dark:border-white/30 ${
            scrolled
              ? 'nav-shell--scrolled bg-white/95 dark:bg-ink-900/95'
              : 'nav-shell--top bg-white/85 dark:bg-ink-900/85'
          }`}
        >
          <a href="#topo" className="group flex min-w-0 items-center gap-2" onClick={closeMenu}>
            <img
              src={assetUrl('/monogram.svg')}
              alt=""
              width={36}
              height={36}
              className="nav-logo h-8 w-8 shrink-0 border-2 border-black dark:border-white/30 sm:h-9 sm:w-9"
            />
            <span className="whitespace-nowrap font-display text-base font-semibold tracking-tight sm:text-lg">
              {BRAND.name}
              <span className="text-roxo dark:text-ciano">{BRAND.nameSuffix}</span>
            </span>
          </a>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {ALL_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`nav-link ${active === link.href ? 'nav-link--active' : ''}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            {/* wrapper: `hidden` não vence o `inline-flex` do .btn-primary */}
            <span className="hidden sm:block">
              <a href="#contato" className="btn-primary nav-cta px-3 py-2.5 text-[10px] sm:px-4 sm:text-[11px]">
                Orçamento
              </a>
            </span>
            <button
              type="button"
              className="nav-burger inline-flex h-10 w-10 items-center justify-center border-2 border-black text-slate-700 lg:hidden dark:border-white/30 dark:text-slate-200"
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
          className="nav-mobile mt-2 border-2 border-black bg-white p-4 lg:hidden dark:border-white/30 dark:bg-ink-850"
        >
          <ul className="flex flex-col gap-1">
            {ALL_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="mobile-nav-link" onClick={closeMenu}>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contato"
                className="mobile-nav-link mt-2 block border-2 border-black bg-roxo px-4 py-3 text-center font-pixel text-[11px] text-black shadow-pixel-sm"
                onClick={closeMenu}
              >
                Bora conversar
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
