'use client'

import type { ChangeEvent, FormEvent } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import type { CategoryEntity } from '@/types/product'

import styles from '../Products.module.scss'

type ProductsFiltersProps = {
  categories: CategoryEntity[]
  initialSearch?: string
  initialCategoryId?: number
}

const SEARCH_DEBOUNCE_MS = 1_000

const buildSearchParams = ({
  search,
  categoryId,
}: {
  search: string
  categoryId: string
}): string => {
  const params = new URLSearchParams()

  if (search.trim()) {
    params.set('search', search.trim())
  }

  if (categoryId) {
    params.set('categoryId', categoryId)
  }

  const query = params.toString()
  return query ? `?${query}` : ''
}

export default function ProductsFilters({
  categories,
  initialSearch,
  initialCategoryId,
}: ProductsFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const initialCategoryValue = initialCategoryId ? String(initialCategoryId) : ''

  const [searchValue, setSearchValue] = useState(initialSearch ?? '')
  const [categoryValue, setCategoryValue] = useState(initialCategoryValue)
  const hasMounted = useRef(false)
  const userTriggered = useRef(false)

  const searchQuery = useMemo(
    () =>
      buildSearchParams({
        search: searchValue,
        categoryId: categoryValue,
      }),
    [searchValue, categoryValue],
  )

  useEffect(() => {
    setSearchValue(initialSearch ?? '')
    setCategoryValue(initialCategoryId ? String(initialCategoryId) : '')
  }, [initialSearch, initialCategoryId])

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true
      return
    }

    if (!userTriggered.current) {
      return
    }

    userTriggered.current = false

    const currentQuery = searchParams?.toString() ?? ''
    const nextQuery = searchQuery.startsWith('?') ? searchQuery.slice(1) : searchQuery

    if (currentQuery === nextQuery) {
      return
    }

    const handle = setTimeout(() => {
      router.push(`${pathname}${searchQuery}`, { scroll: false })
    }, SEARCH_DEBOUNCE_MS)

    return () => clearTimeout(handle)
  }, [pathname, router, searchParams, searchQuery])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    userTriggered.current = true
    router.push(`${pathname}${searchQuery}`, { scroll: false })
    userTriggered.current = false
  }

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    userTriggered.current = true
    setCategoryValue(event.target.value)
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    userTriggered.current = true
    setSearchValue(event.target.value)
  }

  return (
    <form action="/products" className={styles.searchForm} method="get" onSubmit={handleSubmit}>
      <div className={styles.searchRow}>
        <input
          className={styles.searchInput}
          name="search"
          onChange={handleSearchChange}
          placeholder="Search product"
          type="text"
          value={searchValue}
        />
        <button className={styles.findButton} type="submit">
          Find now
        </button>
      </div>

      <div className={styles.filterRow}>
        <select
          className={styles.select}
          name="categoryId"
          onChange={handleCategoryChange}
          value={categoryValue}
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
    </form>
  )
}
