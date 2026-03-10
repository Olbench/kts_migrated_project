import type { Metadata } from 'next'

import CartPage from '@/pages/CartPage'

export const metadata: Metadata = {
  title: 'Cart | Lalasia',
}

export default function CartRoutePage() {
  return <CartPage />
}
