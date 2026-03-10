import Link from 'next/link'

import styles from '../Products.module.scss'

type PaginationItem = number | 'dots-left' | 'dots-right'

type ProductsPaginationProps = {
  currentPage: number
  totalPages: number
  paginationItems: PaginationItem[]
  buildHref: (page: number) => string
}

export default function ProductsPagination({
  currentPage,
  totalPages,
  paginationItems,
  buildHref,
}: ProductsPaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  return (
    <nav aria-label="Products pagination" className={styles.pagination}>
      {currentPage === 1 ? (
        <span aria-disabled="true" className={styles.pageArrow}>
          &lt;
        </span>
      ) : (
        <Link className={styles.pageArrow} href={buildHref(currentPage - 1)} scroll={false}>
          &lt;
        </Link>
      )}

      {paginationItems.map((item) =>
        typeof item === 'number' ? (
          <Link
            className={`${styles.pageButton} ${item === currentPage ? styles.pageButtonActive : ''}`}
            href={buildHref(item)}
            key={item}
            scroll={false}
          >
            {item}
          </Link>
        ) : (
          <span className={styles.pageDots} key={item}>
            ...
          </span>
        ),
      )}

      {currentPage === totalPages ? (
        <span aria-disabled="true" className={styles.pageArrow}>
          &gt;
        </span>
      ) : (
        <Link className={styles.pageArrow} href={buildHref(currentPage + 1)} scroll={false}>
          &gt;
        </Link>
      )}
    </nav>
  )
}
