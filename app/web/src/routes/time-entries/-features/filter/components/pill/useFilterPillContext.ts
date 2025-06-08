import { useContext } from 'react'
import { FilterPillContext, FilterPillContextProps } from './Provider'

export const useFilterPill = (): FilterPillContextProps => {
  const context = useContext(FilterPillContext)
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider')
  }
  return context
}