import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table'
import { Center, Flex, Group, Loader, Pagination, Table, Text } from '@mantine/core'
import pluralize from 'pluralize'

import { useTableOpsContext } from './useTableOps'

export const EntityTable = function <TData>({
  rows,
  pageCount,
  rowCount,
  columns,
  minTableWidth = 800,
  isLoading = false,
}: EntityTableProps<TData>) {
  const { pagination, setPagination } = useTableOpsContext()

  const table = useReactTable({
    data: rows ?? [],
    columns,
    pageCount: pageCount ?? -1,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true,
  })

  const startItemNumber = pagination.pageIndex * pagination.pageSize + 1
  const endItemNumberDefault = startItemNumber + pagination.pageSize - 1
  const endItemNumber = endItemNumberDefault > rowCount ? rowCount : endItemNumberDefault

  return (
    <>
      <Table.ScrollContainer minWidth={minTableWidth}>
        <Table>
          <Table.Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Table.Th ta={header.column.columnDef.meta?.alignHeader} w={header.getSize()} key={header.id}>
                      {header.isPlaceholder ? null : (
                        <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                      )}
                    </Table.Th>
                  )
                })}
              </Table.Tr>
            ))}
          </Table.Thead>
          <Table.Tbody>
            {isLoading ? (
              <Table.Tr>
                <Table.Td colSpan={columns.length}>
                  <Center mih='200px'>
                    <Loader />
                  </Center>
                </Table.Td>
              </Table.Tr>
            ) : (
              table.getRowModel().rows.map((row) => {
                return (
                  <Table.Tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <Table.Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Table.Td>
                      )
                    })}
                  </Table.Tr>
                )
              })
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <Flex px='xs' pb='xs' align='end' justify='space-between' hidden={isLoading}>
        <Text size='sm'>
          About{' '}
          <Text span fw='bold'>
            {rowCount}
          </Text>{' '}
          {pluralize('results', rowCount)}
        </Text>
        <Group justify='flex-end'>
          <Text size='sm'>
            Showing {startItemNumber} - {endItemNumber} of {rowCount}
          </Text>

          <Pagination
            size='sm'
            value={table.getState().pagination.pageIndex + 1}
            onChange={(page) => table.setPageIndex(page - 1)}
            total={table.getPageCount()}
            withPages={false}
          />
        </Group>
      </Flex>
    </>
  )
}

type EntityTableProps<TData> = {
  minTableWidth?: number
  rows: TData[]
  pageCount: number
  rowCount: number
  columns: ColumnDef<TData>[]
  isLoading?: boolean
}
