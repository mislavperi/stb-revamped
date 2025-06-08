import { FC } from 'react'
import { MultiSelect } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'

import { useHandleMultiSelectQueryParam } from '../../hooks/useHandleMultiSelectQueryParam'
import { useFetchTimeEntries } from '@/routes/time-entries/-features/table/hooks/useFetchTimeEntries'
export const ClientFilter: FC = () => {
  const { data: timeEntries = [] } = useFetchTimeEntries()

  const allClients = timeEntries.reduce<string[]>((acc, entry) => {
    if (!acc.includes(entry.clientName)) {
      acc.push(entry.clientName)
    }
    return acc
  }, [])

  const {
    searchParams: { client = [] },
    handleChange,
  } = useHandleMultiSelectQueryParam('client')

  return (
    <MultiSelect
      value={client}
      onChange={handleChange}
      leftSection={<IconSearch size={16} />}
      data={allClients}
      searchable
      comboboxProps={{ withinPortal: false }}
      clearable
    />
  )
}
