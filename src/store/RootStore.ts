import CartStore from './CartStore'

export default class RootStore {
  readonly cartStore: CartStore

  constructor() {
    this.cartStore = new CartStore()
  }

  destroy(): void {
    this.cartStore.destroy()
  }
}
