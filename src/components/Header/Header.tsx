'use client'

import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import ThemeToggle from '@/components/ThemeToggle/ThemeToggle'
import { useCartStore } from '@/store/CartStoreContext'

import styles from './Header.module.scss'

const Header = observer(() => {
  const cartStore = useCartStore()
  const pathname = usePathname()
  const safePathname = pathname ?? ''
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const getNavClassName = (href: string): string =>
    `${styles.link} ${safePathname.startsWith(href) ? styles.linkActive : ''}`

  const handleToggleMenu = () => setIsMenuOpen((prev) => !prev)
  const handleCloseMenu = () => setIsMenuOpen(false)

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.logo} href="/products">
          <Image alt="Lalasia" className={styles.logoIcon} height={42} src="/icons/logo.svg" width={42} />
          <span>Lalasia</span>
        </Link>

        <nav className={styles.nav}>
          <Link className={getNavClassName('/products')} href="/products">
            Products
          </Link>
          <Link className={getNavClassName('/categories')} href="/categories">
            Categories
          </Link>
          <Link className={getNavClassName('/about')} href="/about">
            About us
          </Link>
        </nav>

        <div className={styles.actions}>
          <button
            aria-label="Toggle menu"
            className={styles.burger}
            onClick={handleToggleMenu}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
          <div className={styles.themeToggle}>
            <ThemeToggle />
          </div>
          <Link aria-label="Cart" className={styles.iconLink} href="/cart">
            <Image
              alt="Cart"
              className={styles.icon}
              height={30}
              src="/icons/icon_cart.svg"
              style={{ filter: 'var(--icon-filter)' }}
              width={30}
            />
            {cartStore.count > 0 && <span className={styles.badge}>{cartStore.count}</span>}
          </Link>
          <Link aria-label="User profile" className={styles.iconLink} href="/user-profile">
            <Image
              alt="User profile"
              className={styles.icon}
              height={30}
              src="/icons/icon_user.svg"
              style={{ filter: 'var(--icon-filter)' }}
              width={30}
            />
          </Link>
        </div>
      </div>

      {isMenuOpen ? (
        <div className={styles.mobileMenu} role="menu">
          <nav className={styles.mobileNav}>
            <Link className={styles.mobileLink} href="/products" onClick={handleCloseMenu}>
              Products
            </Link>
            <Link className={styles.mobileLink} href="/categories" onClick={handleCloseMenu}>
              Categories
            </Link>
            <Link className={styles.mobileLink} href="/about" onClick={handleCloseMenu}>
              About us
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  )
})

export default Header
