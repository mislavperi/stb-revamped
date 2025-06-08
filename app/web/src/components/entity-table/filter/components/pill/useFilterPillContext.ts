import { createContext, useContext } from 'react'
import { FilterPillContextProps } from './Provider'

export const FilterPillContext = createContext<FilterPillContextProps>({
  isFilterMenuOpen: false,
  setIsFilterMenuOpen: () => {},
})

export const useFilterPill = (): FilterPillContextProps => {
  const context = useContext(FilterPillContext)
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider')
  }
  return context
}