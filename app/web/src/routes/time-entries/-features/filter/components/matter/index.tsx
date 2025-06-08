import { FC } from 'react'
import { MultiSelect } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'

import { useHandleMultiSelectQueryParam } from '../../hooks/useHandleMultiSelectQueryParam'
import { useFetchTimeEntries } from '@/routes/time-entries/-features/table/hooks/useFetchTimeEntries'

export const MatterFilter: FC = () => {
  const { data: timeEntries = [] } = useFetchTimeEntries()

  const allMatters = timeEntries.reduce<string[]>((acc, entry) => {
    if (!acc.includes(entry.matterName)) {
      acc.push(entry.matterName)
    }
    return acc
  }, [])

  const {
    searchParams: { matter = [] },
    handleChange,
  } = useHandleMultiSelectQueryParam('matter')

  return (
    <MultiSelect
      leftSection={<IconSearch size={16} />}
      value={matter}
      onChange={handleChange}
      data={allMatters}
      searchable
      comboboxProps={{ withinPortal: false }}
      clearable
      limit={5}
    />
  )
}
