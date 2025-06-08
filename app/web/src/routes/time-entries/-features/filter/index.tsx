import { FC } from 'react'
import { Button, Group } from '@mantine/core'

import { filters } from './config'
import { FilterPill } from './components'
import { routeApi, TimeEntrySearchParams, TimePeriodGteKey, TimePeriodKey, TimePeriodLteKey } from '../../-util'
import { FilterPillProvider } from './components/pill/Provider'

const { useNavigate } = routeApi

export const Filters: FC = () => {
  const navigate = useNavigate()

  const handleClearAllFilters = () => {
    navigate({
      search(prev) {
        const newSearch = { ...prev }
        for (const key in newSearch) {
          if (whiteListOfFilters[key as keyof TimeEntrySearchParams]) {
            delete newSearch[key as keyof TimeEntrySearchParams]
          }
        }
        return newSearch
      },
    })
  }

  return (
    <Group gap='5' maw='70%'>
      {filters.map((filter) => {
        return (
          <FilterPillProvider key={filter.key}>
            <FilterPill filter={filter} />
          </FilterPillProvider>
        )
      })}
      <Button onClick={handleClearAllFilters} variant='subtle' size='xs' fz='sm'>
        Clear All
      </Button>
    </Group>
  )
}

const whiteListOfFilters: Partial<Record<keyof TimeEntrySearchParams, boolean>> = {
  matter: true,
  [TimePeriodGteKey]: true,
  [TimePeriodLteKey]: true,
  [TimePeriodKey]: true,
  workedBy: true,
  billedStatus: true,
  client: true,
  page: true,
}
