import type { Metadata } from 'next'

import { getCategories } from '@/api/categories'
import { getProducts } from '@/api/products'
import Categories from '@/screens/Categories/Categories'

export const metadata: Metadata = {
  title: 'Categories | Lalasia',
}

export default async function CategoriesPage() {
  const [categories, productsResult] = await Promise.all([
    getCategories({ revalidate: 300 }),
    getProducts({ pageSize: 100 }, { revalidate: 60 }),
  ])

  const categoriesWithPreview = categories.map((category) => {
    const productWithImage = productsResult.products.find(
      (product) => product.categoryId === category.id && product.imageUrl,
    )

    return {
      ...category,
      previewImageUrl: productWithImage?.imageUrl,
    }
  })

  return <Categories categories={categoriesWithPreview} />
}
