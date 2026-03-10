import type { Metadata } from 'next'

import PlaceholderPage from '@/pages/PlaceholderPage'

export const metadata: Metadata = {
  title: 'User profile | Lalasia',
}

export default function UserProfilePage() {
  return <PlaceholderPage title="User profile" />
}
