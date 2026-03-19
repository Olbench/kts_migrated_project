import ProductSkeleton from '@/screens/Products/components/ProductSkeleton'
import styles from '@/screens/Products/Products.module.scss'

export default function ProductsLoading() {
  return (
    <section className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Products</h1>
        <p className={styles.subtitle}>Loading catalog...</p>
      </div>

      <div className={styles.grid}>
        {Array.from({ length: 9 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    </section>
  )
}
