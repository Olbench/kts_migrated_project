import Image from 'next/image'
import Link from 'next/link'

import type { CategoryEntity } from '@/types/product'

import styles from './Categories.module.scss'

type CategoriesProps = {
  categories: (CategoryEntity & { previewImageUrl?: string })[]
}

const buildCategoryHref = (category: CategoryEntity): string => {
  const params = new URLSearchParams()
  params.set('categoryId', String(category.id))
  return `/products?${params.toString()}`
}

export default function Categories({ categories }: CategoriesProps) {
  return (
    <section className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Categories</h1>
        <p className={styles.subtitle}>Browse products by category and discover new items.</p>
      </div>

      {categories.length === 0 ? (
        <p className={styles.state}>No categories found</p>
      ) : (
        <div className={styles.grid}>
          {categories.map((category) => (
            <Link key={category.id} className={styles.card} href={buildCategoryHref(category)}>
              {category.previewImageUrl ? (
                <Image
                  alt={category.title}
                  className={styles.cardImage}
                  height={160}
                  src={category.previewImageUrl}
                  unoptimized
                  width={320}
                />
              ) : (
                <div className={styles.cardImage} />
              )}
              <span className={styles.cardTitle}>{category.title}</span>
              <span className={styles.cardLink}>View products</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
