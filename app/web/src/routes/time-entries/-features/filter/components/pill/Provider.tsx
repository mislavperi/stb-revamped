import { createContext, useState, Dispatch, SetStateAction, FC, PropsWithChildren } from 'react'

export interface FilterPillContextProps {
  isFilterMenuOpen: boolean
  setIsFilterMenuOpen: Dispatch<SetStateAction<boolean>>
}

export const FilterPillContext = createContext<FilterPillContextProps>({
  isFilterMenuOpen: false,
  setIsFilterMenuOpen: () => {},
})

export const FilterPillProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState<boolean>(false)

  return (
    <FilterPillContext.Provider value={{ isFilterMenuOpen, setIsFilterMenuOpen }}>
      {children}
    </FilterPillContext.Provider>
  )
}
