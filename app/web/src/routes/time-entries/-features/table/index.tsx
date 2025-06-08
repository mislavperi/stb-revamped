import { FC } from 'react'
import { Card } from '@mantine/core'

import { EntityTable } from '@/components/entity-table/Table'
import { useFetchTimeEntries } from './hooks'
import { TimeEntry } from './api/types'
import { useColumnConfig } from './hooks/useEditColumns'

export const Table: FC = () => {
  const { timeEntries, pageCount, rowCount } = useFetchTimeEntries()
  const columns = useColumnConfig()
  return (
    <Card p={0} radius='md' shadow='xs' flex={1}>
      <EntityTable<TimeEntry> rows={timeEntries} pageCount={pageCount} columns={columns} rowCount={rowCount} />
    </Card>
  )
}
