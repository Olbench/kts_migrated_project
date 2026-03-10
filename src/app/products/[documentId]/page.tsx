import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getProductByDocumentId } from '@/api/products'
import ProductPage from '@/pages/ProductPage'

type ProductDetailsPageProps = {
  params: Promise<{ documentId: string }>
}
export const revalidate = 60

export async function generateMetadata({ params }: ProductDetailsPageProps): Promise<Metadata> {
  const { documentId } = await params
  const product = await getProductByDocumentId(documentId, { revalidate: 60 })

  if (!product) {
    return {
      title: 'Product not found | Lalasia',
    }
  }

  return {
    title: `${product.title} | Lalasia`,
    description: product.description,
  }
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { documentId } = await params
  const product = await getProductByDocumentId(documentId, { revalidate: 60 })

  if (!product) {
    notFound()
  }

  return <ProductPage product={product} />
}
