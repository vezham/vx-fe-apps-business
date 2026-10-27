import { createContext, useContext } from 'react'

type PageSearchContextValue = {
  query: string
  setQuery: (query: string) => void
}

export const PageSearchContext = createContext<PageSearchContextValue | null>(
  null
)

export const usePageSearch = () => {
  const context = useContext(PageSearchContext)

  if (!context) {
    throw new Error('usePageSearch must be used within PageSearchContext')
  }

  return context
}
