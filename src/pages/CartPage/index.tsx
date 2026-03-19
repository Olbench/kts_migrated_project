import StoreProvider from '@/providers/StoreProvider'
import CartPage from '@/screens/CartPage/CartPage'

export default function CartPageRoute() {
  return (
    <StoreProvider>
      <CartPage />
    </StoreProvider>
  )
}
