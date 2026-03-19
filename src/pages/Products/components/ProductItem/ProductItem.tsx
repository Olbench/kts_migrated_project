'use client'

import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import Link from 'next/link'

import { useCartStore } from '@/store/CartStoreContext'
import type { ProductEntity } from '@/types/product'

import styles from './ProductItem.module.scss'

type ProductItemProps = {
  product: ProductEntity
}

const ProductItem = observer(({ product }: ProductItemProps) => {
  const cartStore = useCartStore()
  const quantity = cartStore.getProductQuantity(product.id)

  const handleAdd = () => {
    cartStore.addToCart(product, 1)
  }

  const handleRemove = () => {
    cartStore.removeFromCart(product.id, 1)
  }

  return (
    <article className={styles.card}>
      <Link aria-label={product.title} className={styles.imageLink} href={`/products/${product.documentId}`}>
        {product.imageUrl ? (
          <Image
            alt={product.title}
            className={styles.image}
            height={286}
            src={product.imageUrl}
            unoptimized
            width={394}
          />
        ) : (
          <div className={styles.image} />
        )}
      </Link>
      <div className={styles.content}>
        <span className={styles.category}>{product.category}</span>
        <Link className={styles.titleLink} href={`/products/${product.documentId}`}>
          {product.title}
        </Link>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.footer}>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
          {quantity > 0 ? (
            <div className={styles.counter} aria-label="Quantity selector">
              <button className={styles.counterButton} onClick={handleRemove} type="button">
                -
              </button>
              <span className={styles.counterValue}>{quantity}</span>
              <button className={styles.counterButton} onClick={handleAdd} type="button">
                +
              </button>
            </div>
          ) : (
            <button className={styles.addButton} onClick={handleAdd} type="button">
              Add to cart
            </button>
          )}
        </div>
      </div>
    </article>
  )
})

export default ProductItem
