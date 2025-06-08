import { Button, Flex, Group, Input, Stack } from '@mantine/core'
import { RouteComponent, createFileRoute } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import { IconSearch } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'

import { DefaultErrorDisplay, PageHeader } from '@/components'
import { TableOpsProvider } from '@/components/entity-table'
import { Filters } from './-features/filter'
import { Table } from './-features/table'
import { CreateTimeEntry } from './-features/create'
import { timeEntrySearchParamsSchema } from './-util/route'
import { TableActions } from './-features/actions'
import { RowsPerPageSelector } from './-features/table/components/rows-per-page'

const TimeEntriesPage: RouteComponent = () => {
  const [isCreateOpen, { toggle: toggleIsCreateOpen }] = useDisclosure(false)
  return (
    <Stack>
      <PageHeader
        title='Time Entry'
        rightAction={
          <Group>
            {/* <SegmentedControl data={['Insight View', 'Classic View']} /> */}
            <Button onClick={toggleIsCreateOpen}>{isCreateOpen ? 'Close' : 'Create'}</Button>
          </Group>
        }
      />
      <Flex justify='space-between'>
        <Input placeholder='Search' rightSectionPointerEvents='all' leftSection={<IconSearch size={16} />} w='40vw' />
        <RowsPerPageSelector w='70px' />
      </Flex>
      <Flex justify='space-between'>
        <Filters />
        <TableActions />
      </Flex>
      <Flex gap='xl'>
        <TableOpsProvider startingPageIndex={0} pageSize={10}>
          <Table />
        </TableOpsProvider>
        {isCreateOpen ? <CreateTimeEntry /> : null}
      </Flex>
    </Stack>
  )
}

/**
 * Creation Full items only:
 * - Hours or Start/end
 * - Rate selector
 * - Billable
 * - Timekeeper
 */

export const Route = createFileRoute('/time-entries/')({
  // loader: ({ context: { queryClient }, params: { uuid } }) => {
  //   return queryClient.ensureQueryData(getQueryOptions(uuid))
  // },
  validateSearch: zodValidator(timeEntrySearchParamsSchema),
  errorComponent: DefaultErrorDisplay,
  component: TimeEntriesPage,
})
