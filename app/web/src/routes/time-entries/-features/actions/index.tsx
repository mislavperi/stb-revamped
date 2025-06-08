import { FC } from 'react'
import { Button, Group, Menu } from '@mantine/core'
import { IconSettings, IconShare2 } from '@tabler/icons-react'

import { TimeEntryColumnEdit } from './components'

export const TableActions: FC = () => {
  return (
    <Group justify='flex-end' gap='0'>
      <Button size='sm' leftSection={<IconShare2 size={16} />} variant='subtle'>Export</Button>
      <Menu width={220} withinPortal={false}>
        <Menu.Target>
          <Button size='sm' leftSection={<IconSettings size={16} />} variant='subtle'>Edit columns</Button>
        </Menu.Target>
        <Menu.Dropdown>
          {/* <Menu.Label>Fixed columns</Menu.Label>
          <Text>Date</Text> */}
          <TimeEntryColumnEdit />
        </Menu.Dropdown>
      </Menu>
    </Group>
  )
}
