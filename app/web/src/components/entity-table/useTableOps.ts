import { createContext, useContext } from 'react'
import { TableOpsContextProps } from './Provider'

export const TableOpsContext = createContext<TableOpsContextProps>({
  pagination: { pageIndex: 0, pageSize: 10 },
  setPagination: () => {},
})

export const useTableOpsContext = (): TableOpsContextProps => {
  const context = useContext(TableOpsContext)
  if (!context) {
    throw new Error('useTableOpsContext must be used within a TableOps')
  }
  return context
}
