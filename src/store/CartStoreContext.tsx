'use client'

import type CartStore from './CartStore'
import { useRootStore } from './RootStoreContext'

export const useCartStore = (): CartStore => {
  const { cartStore } = useRootStore()
  return cartStore
}
