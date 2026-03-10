import { useEffect, useState } from 'react'

export interface ILocalStore {
  destroy(): void
}

export const useLocalStore = <T extends ILocalStore>(creator: () => T): T => {
  const [store] = useState<T>(creator)

  useEffect(() => {
    return () => {
      store.destroy()
    }
  }, [store])

  return store
}
