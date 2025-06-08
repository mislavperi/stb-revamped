import { Menu, Button } from '@mantine/core'
import { IconSettings } from '@tabler/icons-react'
import { AccessorKeyColumnDef } from '@tanstack/react-table'

import { ColumnEditRows } from './Rows'

export const ColumnEditTrigger = function <TRow>({ defaultColumns, columnKey }: ColumnEditTriggerProps<TRow>) {
  return (
    <Menu width={220} withinPortal={false} position="bottom-end">
      <Menu.Target>
        <Button size='sm' leftSection={<IconSettings size={16} />} variant='subtle'>
          Edit columns
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <ColumnEditRows<TRow> defaultColumns={defaultColumns} columnKey={columnKey} />
      </Menu.Dropdown>
    </Menu>
  )
}

type ColumnEditTriggerProps<TRow> = {
  defaultColumns: AccessorKeyColumnDef<TRow>[]
  columnKey: string
}
