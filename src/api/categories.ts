import 'server-only'

import { API_BASE_URL } from '@/config/api'
import type { CategoryEntity } from '@/types/product'

const toObject = (value: unknown): Record<string, unknown> =>
  value !== null && typeof value === 'object' ? (value as Record<string, unknown>) : {}

const toStringValue = (value: unknown, fallback = ''): string =>
  typeof value === 'string' ? value : fallback

const toNumberValue = (value: unknown, fallback = 0): number => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  if (typeof value === 'string') {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) {
      return parsed
    }
  }

  return fallback
}

const mapCategory = (value: unknown): CategoryEntity | null => {
  const raw = toObject(value)

  const id = toNumberValue(raw.id)
  const documentId = toStringValue(raw.documentId)
  const title = toStringValue(raw.title)

  if (!id || !title) {
    return null
  }

  return { id, documentId, title }
}

type RequestOptions = {
  revalidate?: number
  cache?: RequestCache
}

export const getCategories = async (
  requestOptions: RequestOptions = {},
): Promise<CategoryEntity[]> => {
  const response = await fetch(`${API_BASE_URL}/product-categories`, {
    cache: requestOptions.cache,
    next: requestOptions.revalidate ? { revalidate: requestOptions.revalidate } : undefined,
  })

  if (!response.ok) {
    throw new Error('Failed to load categories')
  }

  const responseData = toObject(await response.json())
  const data = Array.isArray(responseData.data) ? responseData.data : []

  return data.map(mapCategory).filter((category): category is CategoryEntity => category !== null)
}
