const statusMap: Record<string, { color: string; label: string }> = {
  active: {
    color: 'green',
    label: 'Active',
  },
  inactive: {
    color: 'red',
    label: 'Inactive',
  },
}

const statusMapReverseLookup: Record<string, { key: string; color: string }> = Object.entries(statusMap).reduce(
  (acc, [key, value]) => {
    acc[value.label] = { key, color: value.color }
    return acc
  },
  {} as Record<string, { key: string; color: string }>,
)

export const getStatusColor = (status: string) => {
  let possibleColor = statusMap[status]?.color
  if (possibleColor) return possibleColor
  possibleColor = statusMapReverseLookup[status]?.color
  if (possibleColor) return possibleColor
  return 'gray'
}

export const getStatusLabel = (status: string) => {
  let label = statusMap[status]?.label
  if (label) return label
  label = statusMapReverseLookup[status]?.key
  if (label) return label
  return 'Unknown'
}

export const getStatusKey = (status: string) => {
  return statusMapReverseLookup[status]?.key || 'unknown'
}
