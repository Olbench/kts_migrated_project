'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import styles from './MultiDropdown.module.scss'

export type Option = {
  key: string
  value: string
}

export type MultiDropdownProps = {
  className?: string
  options: Option[]
  value: Option[]
  onChange: (value: Option[]) => void
  disabled?: boolean
  getTitle: (value: Option[]) => string
}

const MultiDropdown = ({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle,
}: MultiDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  const filteredOptions = useMemo(() => {
    if (!query.trim()) {
      return options
    }

    const normalized = query.toLowerCase()
    return options.filter((option) => option.value.toLowerCase().startsWith(normalized))
  }, [options, query])

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', onClickOutside)
    return () => document.removeEventListener('click', onClickOutside)
  }, [])

  const handleOptionClick = (option: Option) => {
    const optionIndex = value.findIndex((item) => item.key === option.key)
    if (optionIndex !== -1) {
      onChange(value.slice(0, optionIndex).concat(value.slice(optionIndex + 1)))
      return
    }

    onChange([...value, option])
    setIsOpen(false)
  }

  const title = value.length ? getTitle(value) : query

  return (
    <div className={`${styles.container} ${className || ''}`} ref={containerRef}>
      <div className={styles.control}>
        <input
          className={styles.input}
          disabled={disabled}
          onChange={(event) => setQuery(event.target.value)}
          onClick={() => !disabled && setIsOpen(true)}
          placeholder={getTitle(value)}
          type="text"
          value={title}
        />
        <span className={styles.arrow}>▾</span>
      </div>

      {isOpen && !disabled && (
        <div className={styles.options}>
          {filteredOptions.map((option) => (
            <button
              className={styles.option}
              key={option.key}
              onClick={() => handleOptionClick(option)}
              type="button"
            >
              {option.value}
            </button>
          ))}
          {filteredOptions.length === 0 && <div className={styles.empty}>No options</div>}
        </div>
      )}
    </div>
  )
}

export default MultiDropdown
