import { AccessorKeyColumnDef, createColumnHelper } from '@tanstack/react-table'
import { Flex } from '@mantine/core'

import { DateCell, BasicTextCell, CurrencyCell, NumberCell } from '@/components/entity-table/cells'
import type { TimeEntry } from '../api'

const columnHelper = createColumnHelper<TimeEntry>()
// It's unclear how to handle more than one type of column as an arg. The any is because the column is given a string, Date, number, etc
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const defaultColumns: AccessorKeyColumnDef<TimeEntry, any>[] = [
  columnHelper.accessor('dtLogged', {
    header: 'Date',
    cell(cellProps) {
      return <DateCell {...cellProps} textProps={{ fw: 700 }} />
    },
    size: 200,
    meta: { alignHeader: 'right' },
  }),
  columnHelper.accessor('workedByName', {
    header: 'Worked By',
    cell: BasicTextCell,
    size: 250,
  }),
  columnHelper.accessor('clientName', {
    header: 'Client',
    cell: BasicTextCell,
    size: 400,
  }),
  columnHelper.accessor('matterName', {
    header: 'Matter',
    cell: BasicTextCell,
    size: 400,
  }),
  columnHelper.accessor('hoursLogged', {
    header: 'Hours',
    cell: NumberCell,
    size: 100,
    meta: { alignHeader: 'right' },
  }),
  columnHelper.accessor('dtStart', {
    header: 'Start Time',
    cell(cellProps) {
      return <DateCell {...cellProps} format='h:mm a' />
    },
    size: 200,
    meta: { alignHeader: 'right' },
  }),
  columnHelper.accessor('dtStop', {
    header: 'Stop Time',
    cell(cellProps) {
      return <DateCell {...cellProps} format='h:mm a' />
    },
    size: 200,
    meta: { alignHeader: 'right' },
  }),
  columnHelper.accessor('rate', {
    header: 'Rate',
    cell: CurrencyCell,
    size: 150,
    meta: { alignHeader: 'right' },
  }),
  columnHelper.accessor('amount', {
    header: 'Amount',
    cell: CurrencyCell,
    size: 150,
    meta: { alignHeader: 'right' },
  }),
  columnHelper.accessor('isBillable', {
    header: 'Billable',
    cell(cellProps) {
      const isBillable = cellProps.getValue<boolean>()
      return (
        <Flex bg={isBillable ? 'blue.1' : undefined} justify='center'>
          {isBillable ? 'Yes' : 'No'}
        </Flex>
      )
    },
    size: 100,
    meta: { alignHeader: 'center' },
  }),
]

