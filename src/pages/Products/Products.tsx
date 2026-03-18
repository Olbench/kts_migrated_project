import Link from 'next/link'

import ProductsFilters from '@/pages/Products/components/ProductsFilters'
import ProductItem from '@/pages/Products/components/ProductItem'
import ProductsPagination from '@/pages/Products/components/ProductsPagination'
import ProductsScrollToTop from '@/pages/Products/components/ProductsScrollToTop'
import type { CategoryEntity, ProductEntity } from '@/types/product'

import styles from './Products.module.scss'

type PaginationItem = number | 'dots-left' | 'dots-right'

type ProductsProps = {
  products: ProductEntity[]
  totalProducts: number
  categories: CategoryEntity[]
  search?: string
  selectedCategoryId?: number
  currentPage: number
}

const PAGE_SIZE = 9

const getPaginationItems = (currentPage: number, totalPages: number): PaginationItem[] => {
  if (totalPages <= 6) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 'dots-right', totalPages]
  }

  if (currentPage >= totalPages - 2) {
    return [1, 'dots-left', totalPages - 2, totalPages - 1, totalPages]
  }

  return [1, 'dots-left', currentPage, 'dots-right', totalPages]
}

const buildProductsHref = ({
  search,
  categoryId,
  page,
}: {
  search?: string
  categoryId?: number
  page?: number
}): string => {
  const params = new URLSearchParams()

  if (search) {
    params.set('search', search)
  }

  if (categoryId) {
    params.set('categoryId', String(categoryId))
  }

  if (page && page > 1) {
    params.set('page', String(page))
  }

  const query = params.toString()
  return query ? `/products?${query}` : '/products'
}

export default function Products({
  products,
  totalProducts,
  categories,
  search,
  selectedCategoryId,
  currentPage,
}: ProductsProps) {
  const totalPages = Math.max(1, Math.ceil(totalProducts / PAGE_SIZE))
  const paginationItems = getPaginationItems(currentPage, totalPages)
  const selectedCategory = categories.find((category) => category.id === selectedCategoryId)

  return (
    <section className={styles.page}>
      <ProductsScrollToTop />
      <div className={styles.hero}>
        <h1 className={styles.title}>Products</h1>
        <p className={styles.subtitle}>
          We display products based on the latest products we have, if you want to see our old
          products please enter the name of the item.
        </p>
      </div>

      <ProductsFilters
        categories={categories}
        initialCategoryId={selectedCategoryId}
        initialSearch={search}
      />

      {(search || selectedCategory) && (
        <div className={styles.filtersMeta}>
          {selectedCategory ? (
            <span className={styles.filtersLabel}>Category: {selectedCategory.title}</span>
          ) : null}
          {search ? <span className={styles.filtersLabel}>Search: {search}</span> : null}
          <Link className={styles.clearLink} href="/products">
            Clear filters
          </Link>
        </div>
      )}

      <div className={styles.meta}>
        <span>Total products</span>
        <span className={styles.total}>{totalProducts}</span>
      </div>

      {products.length === 0 ? (
        <p className={styles.state}>No products found</p>
      ) : (
        <>
          <div className={styles.grid}>
            {products.map((product) => (
              <ProductItem key={product.documentId} product={product} />
            ))}
          </div>

          <ProductsPagination
            buildHref={(page) =>
              buildProductsHref({
                categoryId: selectedCategory?.id,
                page,
                search,
              })
            }
            currentPage={currentPage}
            paginationItems={paginationItems}
            totalPages={totalPages}
          />
        </>
      )}
    </section>
  )
}
