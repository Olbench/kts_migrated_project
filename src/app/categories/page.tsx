import type { Metadata } from 'next'

import { getCategories } from '@/api/categories'
import { getProducts } from '@/api/products'
import Categories from '@/pages/Categories/Categories'

export const metadata: Metadata = {
  title: 'Categories | Lalasia',
}

export default async function CategoriesPage() {
  const categories = await getCategories({ revalidate: 300 })
  const categoriesWithPreview = await Promise.all(
    categories.map(async (category) => {
      try {
        const { products } = await getProducts(
          { page: 1, pageSize: 1, categoryId: category.id },
          { revalidate: 300 },
        )
        return { ...category, previewImageUrl: products[0]?.imageUrl || '' }
      } catch {
        return { ...category, previewImageUrl: '' }
      }
    }),
  )

  return <Categories categories={categoriesWithPreview} />
}
