import type { Metadata } from 'next'

import PlaceholderPage from '@/pages/PlaceholderPage'

export const metadata: Metadata = {
  title: 'About us | Lalasia',
}

export default function AboutUsPage() {
  return <PlaceholderPage title="About us" />
}
