import { FC, useState, PropsWithChildren, Dispatch, SetStateAction } from 'react'
import { PaginationState } from '@tanstack/react-table'
import { TableOpsContext } from './useTableOps'

export interface TableOpsContextProps {
  pagination: PaginationState
  setPagination: Dispatch<SetStateAction<PaginationState>>
}

export const TableOpsProvider: FC<PropsWithChildren<TableOpsProps>> = ({ startingPageIndex, pageSize, children }) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: startingPageIndex,
    pageSize,
  })

  return <TableOpsContext.Provider value={{ pagination, setPagination }}>{children}</TableOpsContext.Provider>
}

export type TableOpsProps = {
  startingPageIndex: number
  pageSize: number
}
