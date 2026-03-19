import styles from '@/screens/ProductPage/ProductPage.module.scss'

export default function ProductDetailsLoading() {
  return (
    <section className={styles.page}>
      <div className={styles.state}>Loading product...</div>
    </section>
  )
}
