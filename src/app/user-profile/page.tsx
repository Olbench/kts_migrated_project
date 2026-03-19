import type { Metadata } from 'next'

import PlaceholderPage from '@/screens/PlaceholderPage'

export const metadata: Metadata = {
  title: 'User profile | Lalasia',
}

export default function UserProfilePage() {
  return <PlaceholderPage title="User profile" />
}
