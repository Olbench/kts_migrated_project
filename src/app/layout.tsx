import type { Metadata } from 'next'
import localFont from 'next/font/local'

import Header from '@/components/Header'
import '@/components/variables.css'
import StoreProvider from '@/providers/StoreProvider'

import '@/styles/index.scss'
import styles from '@/App.module.scss'

const geistSans = localFont({
  src: './fonts/GeistLatin.woff2',
  variable: '--font-geist-sans',
  display: 'swap',
  weight: '400',
})

const geistMono = localFont({
  src: './fonts/GeistMonoLatin.woff2',
  variable: '--font-geist-mono',
  display: 'swap',
  weight: '400',
})

export const metadata: Metadata = {
  title: 'Lalasia',
  description: 'Furniture store powered by Next.js App Router and MobX',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  icons: {
    icon: '/icons/logo.svg',
  },
  openGraph: {
    title: 'Lalasia',
    description: 'Furniture store powered by Next.js App Router and MobX',
    images: ['/icons/logo.svg'],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StoreProvider>
          <div className={styles.app}>
            <Header />
            <main className={styles.main}>{children}</main>
          </div>
        </StoreProvider>
      </body>
    </html>
  )
}
