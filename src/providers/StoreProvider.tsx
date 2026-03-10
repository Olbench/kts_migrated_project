'use client'

import '@/config/configureMobX'

import type { ReactNode } from 'react'

import { RootStoreProvider } from '@/store/RootStoreContext'

type StoreProviderProps = {
  children: ReactNode
}

export default function StoreProvider({ children }: StoreProviderProps) {
  return <RootStoreProvider>{children}</RootStoreProvider>
}
