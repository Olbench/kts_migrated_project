'use client'

import { useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'

export default function ProductsScrollToTop() {
  const searchParams = useSearchParams()
  const lastPageRef = useRef<number | null>(null)

  useEffect(() => {
    const pageParam = searchParams?.get('page')
    const page = pageParam ? Number(pageParam) : 1

    if (!Number.isFinite(page)) {
      return
    }

    if (lastPageRef.current === null) {
      lastPageRef.current = page
      return
    }

    if (lastPageRef.current !== page) {
      lastPageRef.current = page
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [searchParams])

  return null
}
