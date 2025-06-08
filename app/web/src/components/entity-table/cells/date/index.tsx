import { CellContext } from '@tanstack/react-table'
import { Text, TextProps } from '@mantine/core'

import { safeParseDate } from '@/utils/date'

export const DateCell = function <TData>({
  cell,
  format = 'MMM D, YYYY',
  textProps,
}: DateCellProps<TData>) {
  const value = cell.getValue<Date>()
  const dateDisplay = safeParseDate(value)?.format(format) || '-'
  return <Text ta='right' {...textProps}>{dateDisplay}</Text>
}

type DateCellProps<TData> = {
  format?: string
  textProps?: TextProps
} & CellContext<TData, unknown>
