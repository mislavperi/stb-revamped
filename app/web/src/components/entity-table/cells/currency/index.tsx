import { CellContext } from '@tanstack/react-table'
import { NumberFormatter, NumberFormatterProps, Text } from '@mantine/core'

export const CurrencyCell = function <TData>({
  cell,
  numberFormatterProps,
}: BasicTextCellProps<TData>) {
  return (
    <Text ta='right'>
      <NumberFormatter prefix='$ ' value={cell.getValue() as number} thousandSeparator decimalScale={2} {...numberFormatterProps} />
    </Text>
  )
}

type BasicTextCellProps<TData> = {
  numberFormatterProps?: NumberFormatterProps
} & CellContext<TData, unknown>
