'use client'

import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { useCartStore } from '@/store/CartStoreContext'

import styles from './CartPage.module.scss'

const CartPage = observer(() => {
  const cartStore = useCartStore()
  const [isOrderOpen, setIsOrderOpen] = useState(false)
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })

  const handleOpenOrder = () => setIsOrderOpen(true)
  const handleCloseOrder = () => setIsOrderOpen(false)
  const handleCloseSuccess = () => setIsSuccessOpen(false)

  const handleInputChange = (field: 'name' | 'email' | 'phone', value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmitOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    cartStore.clearCart()
    setFormData({ name: '', email: '', phone: '' })
    setIsOrderOpen(false)
    setIsSuccessOpen(true)
  }

  return (
    <section className={styles.page}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Cart</h1>
        <Link className={styles.shopLink} href="/products">
          Continue shopping
        </Link>
      </div>

      {cartStore.count === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyText}>Your cart is empty</p>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.items}>
            {cartStore.cartItems.map(({ product, quantity }) => (
              <div className={styles.item} key={product.id}>
                <Link className={styles.itemImageLink} href={`/products/${product.documentId}`}>
                  {product.imageUrl ? (
                    <Image
                      alt={product.title}
                      className={styles.itemImage}
                      height={165}
                      src={product.imageUrl}
                      unoptimized
                      width={165}
                    />
                  ) : (
                    <div className={styles.itemImage} />
                  )}
                </Link>
                <div className={styles.itemInfo}>
                  <div className={styles.itemTop}>
                    <div className={styles.itemMeta}>
                      <Link className={styles.itemTitle} href={`/products/${product.documentId}`}>
                        {product.title}
                      </Link>
                      <span className={styles.itemCategory}>{product.category}</span>
                    </div>
                    <div className={styles.itemActions}>
                      <span className={styles.itemCount}>Qty: {quantity}</span>
                      <button
                        aria-label="Remove item"
                        className={styles.removeButton}
                        onClick={() => cartStore.removeItemFromCart(product.id)}
                        type="button"
                      >
                        x
                      </button>
                    </div>
                  </div>

                  <div className={styles.itemBottom}>
                    <div className={styles.quantityControl}>
                      <button
                        className={styles.quantityButton}
                        onClick={() => cartStore.removeFromCart(product.id, 1)}
                        type="button"
                      >
                        -
                      </button>
                      <span className={styles.quantityValue}>{quantity}</span>
                      <button
                        className={styles.quantityButton}
                        onClick={() => cartStore.addToCart(product, 1)}
                        type="button"
                      >
                        +
                      </button>
                    </div>
                    <span className={styles.itemPrice}>${(product.price * quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className={styles.summary}>
            <div className={styles.summaryRow}>
              <span>Items:</span>
              <span>{cartStore.count}</span>
            </div>
            <div className={styles.summaryTotal}>
              <span>Total:</span>
              <span>${cartStore.totalPrice.toFixed(2)}</span>
            </div>
            <button className={styles.orderButton} onClick={handleOpenOrder} type="button">
              Order
            </button>
            <button className={styles.clearButton} onClick={() => cartStore.clearCart()} type="button">
              Clear cart
            </button>
          </aside>
        </div>
      )}

      {isOrderOpen ? (
        <div className={styles.modalOverlay} onClick={handleCloseOrder} role="presentation">
          <div
            className={styles.modal}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-title"
          >
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle} id="order-title">
                Order details
              </h2>
              <button
                aria-label="Close order form"
                className={styles.closeButton}
                onClick={handleCloseOrder}
                type="button"
              >
                <svg aria-hidden="true" viewBox="0 0 20 20">
                  <path
                    d="M5 5l10 10M15 5L5 15"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="1.8"
                  />
                </svg>
              </button>
            </div>
            <p className={styles.modalText}>Leave your contact details and we will reach out soon.</p>
            <form className={styles.form} onSubmit={handleSubmitOrder}>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Name</span>
                <input
                  className={styles.input}
                  onChange={(event) => handleInputChange('name', event.target.value)}
                  required
                  type="text"
                  value={formData.name}
                />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Email</span>
                <input
                  className={styles.input}
                  onChange={(event) => handleInputChange('email', event.target.value)}
                  required
                  type="email"
                  value={formData.email}
                />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Phone</span>
                <input
                  className={styles.input}
                  onChange={(event) => handleInputChange('phone', event.target.value)}
                  required
                  type="tel"
                  value={formData.phone}
                />
              </label>
              <div className={styles.modalActions}>
                <button className={styles.primaryButton} type="submit">
                  Submit order
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {isSuccessOpen ? (
        <div className={styles.modalOverlay} onClick={handleCloseSuccess} role="presentation">
          <div
            className={styles.modal}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-title"
          >
            <h2 className={styles.modalTitle} id="success-title">
              Order placed successfully
            </h2>
            <p className={styles.modalText}>
              Your order has been created. Our manager will contact you shortly.
            </p>
            <div className={styles.modalActions}>
              <button className={styles.primaryButton} onClick={handleCloseSuccess} type="button">
                OK
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
})

export default CartPage
