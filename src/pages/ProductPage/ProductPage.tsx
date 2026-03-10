'use client'

import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import Link from 'next/link'

import { useCartStore } from '@/store/CartStoreContext'
import type { ProductEntity } from '@/types/product'

import styles from './ProductPage.module.scss'

type ProductPageProps = {
  product: ProductEntity
}

const ProductPage = observer(({ product }: ProductPageProps) => {
  const cartStore = useCartStore()

  const quantityInCart = cartStore.getProductQuantity(product.id)
  const inCart = quantityInCart > 0

  const handleAdd = () => {
    cartStore.addToCart(product, 1)
  }

  const handleDecrease = () => {
    cartStore.removeFromCart(product.id, 1)
  }

  return (
    <section className={styles.page}>
      <Link className={styles.backLink} href="/products">
        Back to products
      </Link>
      <div className={styles.content}>
        {product.imageUrl ? (
          <Image
            alt={product.title}
            className={styles.image}
            height={546}
            src={product.imageUrl}
            unoptimized
            width={600}
          />
        ) : (
          <div className={styles.image} />
        )}
        <div className={styles.info}>
          <p className={styles.category}>{product.category}</p>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.price}>${product.price.toFixed(2)}</p>
          {inCart ? (
            <div className={styles.quantityControl}>
              <button className={styles.quantityButton} onClick={handleDecrease} type="button">
                -
              </button>
              <span className={styles.quantityValue}>{quantityInCart}</span>
              <button className={styles.quantityButton} onClick={handleAdd} type="button">
                +
              </button>
            </div>
          ) : (
            <button className={styles.cartButton} onClick={handleAdd} type="button">
              Add to cart
            </button>
          )}
        </div>
      </div>
    </section>
  )
})

export default ProductPage
