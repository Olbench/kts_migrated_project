import type { Metadata } from 'next'

import { getCategories } from '@/api/categories'
import { getProducts } from '@/api/products'
import Products from '@/pages/Products'

export const metadata: Metadata = {
  title: 'Products | Lalasia',
}

type ProductsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams

  const search = typeof params.search === 'string' ? params.search : undefined
  const categoryId = typeof params.categoryId === 'string' ? Number(params.categoryId) : undefined
  const pageValue = typeof params.page === 'string' ? Number(params.page) : 1
  const page = Number.isFinite(pageValue) && pageValue > 0 ? pageValue : 1

  const [categories, productsResult] = await Promise.all([
    getCategories({ revalidate: 300 }),
    getProducts(
      {
        page,
        search,
        categoryId: Number.isFinite(categoryId) ? categoryId : undefined,
      },
      { revalidate: 60 },
    ),
  ])

  return (
    <Products
      categories={categories}
      currentPage={page}
      products={productsResult.products}
      search={search}
      selectedCategoryId={Number.isFinite(categoryId) ? categoryId : undefined}
      totalProducts={productsResult.total}
    />
  )
}
