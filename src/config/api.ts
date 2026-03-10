const defaultBaseUrl = 'https://front-school-strapi.ktsdev.ru/api'

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || defaultBaseUrl

// Cart API is unstable in some environments; keep sync opt-in to avoid noisy network errors.
export const ENABLE_CART_SYNC = process.env.NEXT_PUBLIC_ENABLE_CART_SYNC === 'true'
