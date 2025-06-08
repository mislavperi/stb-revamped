import { FC } from 'react'
import { MultiSelect } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'

import { useHandleMultiSelectQueryParam } from '../../hooks/useHandleMultiSelectQueryParam'
import { useFetchTimeEntries } from '@/routes/time-entries/-features/table/hooks/useFetchTimeEntries'
export const WorkedByFilter: FC = () => {
  const { data: timeEntries = [] } = useFetchTimeEntries()

  const allWorkedBy = timeEntries.reduce<string[]>((acc, entry) => {
    if (!acc.includes(entry.workedByName)) {
      acc.push(entry.workedByName)
    }
    return acc
  }, [])

  const {
    searchParams: { workedBy = [] },
    handleChange,
  } = useHandleMultiSelectQueryParam('workedBy')
  return (
    <MultiSelect
      value={workedBy}
      onChange={handleChange}
      leftSection={<IconSearch size={16} />}
      data={allWorkedBy}
      searchable
      comboboxProps={{ withinPortal: false }}
      clearable
    />
  )
}
