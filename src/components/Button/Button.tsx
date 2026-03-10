import React from 'react'

import Loader from '../Loader'
import Text from '../Text'

import styles from './Button.module.scss'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
}

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  loading = false,
  disabled = false,
  children,
  onClick,
  className,
  ...props
}) => {
  const buttonClass = [
    styles.button,
    className,
    loading ? styles.buttonLoading : '',
    disabled ? styles.buttonDisabled : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button onClick={onClick} className={buttonClass} disabled={loading || disabled} {...props}>
      {loading && <Loader size="s" color="#FFFFFF" />}
      <Text tag="div" view="button">
        {children}
      </Text>
    </button>
  )
}

export default Button
