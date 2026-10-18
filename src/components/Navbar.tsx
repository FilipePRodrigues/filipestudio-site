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
          className={`mt-3 flex items-center justify-between border-2 border-black px-4 py-3 transition-all duration-150 dark:border-white/30 ${
            scrolled
              ? 'shadow-pixel bg-white dark:bg-ink-900'
              : 'shadow-pixel-sm bg-white dark:bg-ink-900'
          }`}
        >
          <a href="#topo" className="group flex min-w-0 items-center gap-2" onClick={closeMenu}>
            <img
              src={assetUrl('/monogram.svg')}
              alt=""
              width={36}
              height={36}
              className="h-8 w-8 shrink-0 border-2 border-black shadow-pixel-sm dark:border-white/30 sm:h-9 sm:w-9"
            />
            <span className="whitespace-nowrap font-display text-base font-semibold tracking-tight sm:text-lg">
              {BRAND.name}
              <span className="text-roxo dark:text-ciano">{BRAND.nameSuffix}</span>
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
            <li>
              <a href="#/blog" className="nav-link">
                Blog
              </a>
            </li>
          </ul>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            {/* wrapper: `hidden` não vence o `inline-flex` do .btn-primary */}
            <span className="hidden sm:block">
              <a href="#contato" className="btn-primary px-3 py-2.5 text-[10px] sm:px-4 sm:text-[11px]">
                Orçamento
              </a>
            </span>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center border-2 border-black text-slate-700 shadow-pixel-sm lg:hidden dark:border-white/30 dark:text-slate-200"
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
          className="mt-2 border-2 border-black bg-white p-4 shadow-pixel lg:hidden dark:border-white/30 dark:bg-ink-850"
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
              <a href="#/blog" className="mobile-nav-link" onClick={closeMenu}>
                Blog
              </a>
            </li>
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
