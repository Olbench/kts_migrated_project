import type { Metadata } from 'next'

import { getCategories } from '@/api/categories'
import Categories from '@/pages/Categories/Categories'

export const metadata: Metadata = {
  title: 'Categories | Lalasia',
}

export default async function CategoriesPage() {
  const categories = await getCategories({ revalidate: 300 })
  return <Categories categories={categories} />
}
