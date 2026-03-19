import type { AppProps } from 'next/app'

import StoreProvider from '@/providers/StoreProvider'

import '@/components/variables.css'
import '@/styles/index.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  )
}
