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

  return (
    <button className={styles.button} onClick={toggleTheme} type="button">
      {theme === 'dark' ? 'Light mode' : 'Dark mode'}
    </button>
  )
}
