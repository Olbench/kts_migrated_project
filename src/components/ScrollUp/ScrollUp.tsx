'use client'

import { useEffect, useState } from 'react'

import styles from './ScrollUp.module.scss'

const SHOW_AFTER_PX = 240

export default function ScrollUp() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      aria-label="Scroll to top"
      className={`${styles.button} ${visible ? styles.visible : ''}`}
      onClick={handleClick}
      type="button"
    >
      <svg aria-hidden="true" height="18" viewBox="0 0 20 20" width="18">
        <path
          d="M5 12l5-5 5 5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </button>
  )
}
