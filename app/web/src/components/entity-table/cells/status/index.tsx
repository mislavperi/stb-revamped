import { CellContext } from '@tanstack/react-table'
import { Badge, BadgeProps } from '@mantine/core'
import { getStatusColor } from './colorMap'

export const StatusCell = function <TData>({ cell, colorMapOverride, badgeProps }: StatusCellProps<TData>) {
  const value = cell.getValue<string>()
  const color = colorMapOverride?.[value] || getStatusColor(value)
  return (
    <Badge variant='light' color={color} {...badgeProps}>
      {value}
    </Badge>
  )
}

type StatusCellProps<TData> = {
  colorMapOverride?: Record<string, string>
  badgeProps?: BadgeProps
} & CellContext<TData, unknown>
