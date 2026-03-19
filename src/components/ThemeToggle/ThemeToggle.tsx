'use client'

import { useEffect, useState } from 'react'

import styles from './ThemeToggle.module.scss'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

const getSystemTheme = (): Theme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

const applyTheme = (theme: Theme) => {
  document.documentElement.dataset.theme = theme
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    const nextTheme = stored ?? getSystemTheme()
    setTheme(nextTheme)
    applyTheme(nextTheme)
  }, [])

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    localStorage.setItem(STORAGE_KEY, nextTheme)
    applyTheme(nextTheme)
  }

  const isDark = theme === 'dark'
  const nextThemeLabel = isDark ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <button
      aria-label={nextThemeLabel}
      className={styles.button}
      onClick={toggleTheme}
      type="button"
    >
      {isDark ? (
        <svg aria-hidden="true" className={`${styles.icon} ${styles.sunIcon}`} viewBox="0 0 24 24">
          <circle cx="12" cy="12" fill="currentColor" r="4.5" />
          <path
            d="M12 2.5v2.5M12 19v2.5M21.5 12h-2.5M5 12H2.5M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8M18.4 18.4l-1.8-1.8M7.4 7.4l-1.8-1.8"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.6"
          />
        </svg>
      ) : (
        <svg aria-hidden="true" className={styles.icon} viewBox="0 0 24 24">
          <path
            d="M21 14.5A9 9 0 1 1 9.5 3a7 7 0 1 0 11.5 11.5Z"
            fill="currentColor"
          />
        </svg>
      )}
    </button>
  )
}
