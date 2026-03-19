import type { Metadata } from 'next'

import CartPage from '@/screens/CartPage'

export const metadata: Metadata = {
  title: 'Cart | Lalasia',
}

export default function CartRoutePage() {
  return <CartPage />
}
