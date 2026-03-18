'use client'

import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import ThemeToggle from '@/components/ThemeToggle/ThemeToggle'
import { useCartStore } from '@/store/CartStoreContext'

import styles from './Header.module.scss'

const Header = observer(() => {
  const cartStore = useCartStore()
  const pathname = usePathname()
  const safePathname = pathname ?? ''

  const getNavClassName = (href: string): string =>
    `${styles.link} ${safePathname.startsWith(href) ? styles.linkActive : ''}`

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
          <Link className={getNavClassName('/about-us')} href="/about-us">
            About us
          </Link>
        </nav>

        <div className={styles.actions}>
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
    </header>
  )
})

export default Header
