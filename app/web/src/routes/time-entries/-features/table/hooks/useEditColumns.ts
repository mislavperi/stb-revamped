import { AccessorColumnDef } from "@tanstack/react-table"
import { useLocalStorage } from "@mantine/hooks"

import { defaultColumns } from "../config"
import { TimeEntry } from "../api/types"

export type ColumnSetting = {
  id: string
  content: string
  enabled: boolean
}

export const getColumnConfig = (): ColumnSetting[] => {
  return defaultColumns.map((column) => {
    return {
      id: column.accessorKey as string,
      content: column.header as string,
      enabled: true,
    }
  })
}

export const useColumnConfig = () => {
  const [columns] = useLocalStorage({
    key: 'time-entry-columns',
    defaultValue: getColumnConfig(),
  })

  const columnDefinitions: AccessorColumnDef<TimeEntry>[] = []
  for (const column of columns) {
    const columnDef = defaultColumns.find((def) => def.accessorKey === column.id)
    if (columnDef && column.enabled) {
      columnDefinitions.push(columnDef)
    }
  }

  console.log('column def', columnDefinitions)
  return columnDefinitions
}
