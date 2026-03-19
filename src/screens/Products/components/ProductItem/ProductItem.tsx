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
  const inCart = cartStore.isInCart(product.id)

  const handleCartClick = () => {
    if (inCart) {
      cartStore.removeItemFromCart(product.id)
    } else {
      cartStore.addToCart(product)
    }
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
          <button
            className={`${styles.addButton} ${inCart ? styles.addButtonInCart : ''}`}
            onClick={handleCartClick}
            type="button"
          >
            {inCart ? 'In cart' : 'Add to cart'}
          </button>
        </div>
      </div>
    </article>
  )
})

export default ProductItem
