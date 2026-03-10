import * as React from 'react'

import styles from './Text.module.scss'

export type TextProps = {
  /** Дополнительный класс */
  className?: string
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14'
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span'
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold'
  /** Контент */
  children: React.ReactNode
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent'
  /** Максимальное кол-во строк */
  maxLines?: number
}

const viewClassMap = {
  title: styles.title,
  button: styles.button,
  'p-20': styles.p20,
  'p-18': styles.p18,
  'p-16': styles.p16,
  'p-14': styles.p14,
} as const

const weightClassMap = {
  normal: styles.weightNormal,
  medium: styles.weightMedium,
  bold: styles.weightBold,
} as const

const colorClassMap = {
  primary: styles.colorPrimary,
  secondary: styles.colorSecondary,
  accent: styles.colorAccent,
} as const

const Text: React.FC<TextProps> = ({
  className = '',
  view,
  tag = 'p',
  weight,
  children,
  color,
  maxLines,
}) => {
  const classes = [
    styles.text,
    className,
    view ? viewClassMap[view] : '',
    weight ? weightClassMap[weight] : '',
    color ? colorClassMap[color] : '',
  ]
    .filter(Boolean)
    .join(' ')
  const Component = tag
  const style = maxLines
    ? ({
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: 'vertical',
        display: '-webkit-box',
        overflow: 'hidden',
      } as React.CSSProperties)
    : undefined

  return (
    <Component data-testid="text" className={classes} style={style}>
      {children}
    </Component>
  )
}

export default Text
