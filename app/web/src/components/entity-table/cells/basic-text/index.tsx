import { CellContext } from '@tanstack/react-table'
import { Text, TextProps } from '@mantine/core'

export const BasicTextCell = function <TData>({
  cell,
  textProps,
}: BasicTextCellProps<TData>) {
  return <Text {...textProps}>{cell.getValue() as string}</Text>
}

type BasicTextCellProps<TData> = { textProps?: TextProps } & CellContext<
  TData,
  unknown
>
