import { CellContext } from '@tanstack/react-table'
import { Text } from '@mantine/core'
import numeral from 'numeral'

export const NumberCell = function <TData>({
  cell,
  format = '0,0.0',
}: NumberCellProps<TData>) {
  const numericValue = cell.getValue<number>()
  if (numericValue === undefined || numericValue === null) return '-'
  if (typeof numericValue !== 'number') {
    throw new Error('NumberCell must be used with a numeric value')
  }

  return (
    <Text ta='right'>
      {numeral(numericValue).format(format)}
    </Text>
  )
}

type NumberCellProps<TData> = {
  format?: string
  colorConfig?: Partial<{
    shouldNotColor: boolean
    positive: string
    negative: string
    neutral: string
  }>
} & CellContext<TData, unknown>
