'use client'

import { createContext, type ReactNode } from 'react'
import { enableStaticRendering } from 'mobx-react-lite'

import { useStrictContext } from '@/utils/useStrictContext'

import RootStore from './RootStore'

const isServer = typeof window === 'undefined'

enableStaticRendering(isServer)

let clientStore: RootStore | undefined

const initRootStore = (): RootStore => new RootStore()

export const useCreateRootStore = (): RootStore => {
  if (isServer) {
    return initRootStore()
  }

  clientStore = clientStore ?? initRootStore()
  return clientStore
}

const RootStoreContext = createContext<RootStore | null>(null)

type RootStoreProviderProps = {
  children: ReactNode
}

export const RootStoreProvider = ({ children }: RootStoreProviderProps) => {
  const store = useCreateRootStore()

  return <RootStoreContext.Provider value={store}>{children}</RootStoreContext.Provider>
}

export const useRootStore = (): RootStore =>
  useStrictContext({
    context: RootStoreContext,
    message: 'RootStoreContext was not provided',
  })
