import { useEffect, useMemo, useState } from 'react'
import type { ThemeMode } from '../data/siteData'

const STORAGE_KEY = 'theme-mode'

function getInitialTheme(): ThemeMode {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(() => getInitialTheme())

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme === 'light' ? 'light' : 'dark'
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const api = useMemo(
    () => ({
      theme,
      setTheme,
      toggle: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    }),
    [theme],
  )

  return api
}

