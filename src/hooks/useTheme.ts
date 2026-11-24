import { useCallback, useEffect, useState } from 'react'
import type { Theme } from '../types/index.ts'

const STORAGE_KEY = 'filipestudio-theme'

/* FS-010.12 · ligação useTheme ↔ coluna light: contrato `html.dark` preservado
   (+ localStorage + colorScheme, default dark) e o toggle também espelha a
   classe `html.light` — a coluna light do index.css aceita os dois seletores
   (`html.light, html:not(.dark)`) por paridade com o protótipo. */
function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  const theme: Theme = stored === 'light' || stored === 'dark' ? stored : 'dark'
  // aplica antes do primeiro paint do conteúdo (evita piscada do tema errado)
  applyTheme(theme)
  return theme
}

function applyTheme(theme: Theme): void {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.classList.toggle('light', theme === 'light')
  root.style.colorScheme = theme
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggleTheme } as const
}
