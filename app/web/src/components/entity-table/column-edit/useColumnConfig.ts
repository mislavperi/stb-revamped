import { AccessorColumnDef, AccessorKeyColumnDef } from '@tanstack/react-table'
import { useLocalStorage } from '@mantine/hooks'
import { useEffect } from 'react'

export type ColumnSetting = {
  id: string
  content: string
  enabled: boolean
  shouldHideInColumnEdit: boolean
}

export const getColumnConfig = <TRow>(defaultColumns: AccessorKeyColumnDef<TRow>[]): ColumnSetting[] => {
  return defaultColumns.map((column) => {
    return {
      id: column.accessorKey as string,
      content: column.header as string,
      enabled: true,
      shouldHideInColumnEdit: column.meta?.shouldHideInColumnEdit ?? false,
    }
  })
}

export const getColumnConfigKey = (key: string) => {  
  return 'entity_table_columns:' + key
}

export const useColumnConfig = <TRow>(defaultColumns: AccessorKeyColumnDef<TRow>[], key: string) => {
  const [columns, setColumns] = useLocalStorage({
    key: getColumnConfigKey(key),
    defaultValue: getColumnConfig(defaultColumns),
  })

  useEffect(() => {
    if(defaultColumns.length !== columns.length) {
      setColumns(getColumnConfig(defaultColumns))
    }
  }, [defaultColumns, setColumns, columns])

  const columnDefinitions: AccessorColumnDef<TRow>[] = []
  for (const column of columns) {
    const columnDef = defaultColumns.find((def) => def.accessorKey === column.id)
    if (columnDef && column.enabled) {
      columnDefinitions.push(columnDef)
    }
  }

  return columnDefinitions
}
