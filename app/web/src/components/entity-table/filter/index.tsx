import { Button, Group } from '@mantine/core'
import { useNavigate } from '@tanstack/react-router'

import { FilterConfig } from './config'
import { FilterPill } from './components'
import { FilterPillProvider } from './components/pill/Provider'

export const TableFilters = function <TParams>({ filters }: FiltersProps<TParams>) {
  const navigate = useNavigate()

  const clearableFilters: Partial<Record<string, boolean>> = filters.reduce<Record<string, boolean>>(
    (acc, filter) => {
      acc[filter.key as string] = true
      return acc
    },
    {},
  )

  const handleClearAllFilters = () => {
    navigate({
      //@ts-expect-error This cannot be made generic
      search(prev: Record<string, string>) {
        const newSearch = { ...prev }
        for (const key in newSearch) {
          if (clearableFilters[key]) {
            delete newSearch[key]
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
          <FilterPillProvider key={filter.key as string}>
            <FilterPill<TParams> filter={filter} />
          </FilterPillProvider>
        )
      })}
      <Button onClick={handleClearAllFilters} variant='subtle' size='xs' fz='sm'>
        Clear All
      </Button>
    </Group>
  )
}

type FiltersProps<TParams> = {
  filters: FilterConfig<TParams>[]
}
