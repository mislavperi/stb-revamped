import { useState, Dispatch, SetStateAction, FC, PropsWithChildren } from 'react'

import { FilterPillContext } from './useFilterPillContext'

export interface FilterPillContextProps {
  isFilterMenuOpen: boolean
  setIsFilterMenuOpen: Dispatch<SetStateAction<boolean>>
}

export const FilterPillProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState<boolean>(false)

  return (
    <FilterPillContext.Provider value={{ isFilterMenuOpen, setIsFilterMenuOpen }}>
      {children}
    </FilterPillContext.Provider>
  )
}
