import { useQuery } from '@tanstack/react-query'

import { fetchTimeEntries } from '../api'
import { useTableOpsContext } from '@/components/entity-table'
import { routeApi } from '@/routes/time-entries/-util'
import { filterTimeEntries } from '../api/filter'

const { useSearch } = routeApi

export const useFetchTimeEntries = () => {
  const { pagination } = useTableOpsContext()
  const searchParams = useSearch()
  const query = useQuery({
    queryKey: ['time-entries', searchParams.q],
    queryFn: async () => {
      const response = await fetchTimeEntries(searchParams.q)
      return response
    },
  })

  const rows = query.data ?? []
  const filteredRows = filterTimeEntries(searchParams, rows)

  const startIndex = pagination.pageIndex * pagination.pageSize
  const endIndex = startIndex + pagination.pageSize
  const timeEntries = filteredRows.slice(startIndex, endIndex)
  const pageCount = Math.ceil(filteredRows.length / (searchParams.itemsPerPage || 10))
  const rowCount = filteredRows.length

  return { timeEntries, rowCount, pageCount, ...query }
}
