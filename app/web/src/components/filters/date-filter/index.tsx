import { FC } from 'react'
import { Box, Button, Select } from '@mantine/core'
import { Link } from '@tanstack/react-router'

import { DATE_FILTER_RENDER_OPTIONS, useHandleDateFilter } from './hooks/use-handle-date-filter'
// TODO: Move this into generic provider dir
import { useFilterPill } from '@/routes/time-entries/-features/filter/components/pill/useFilterPillContext'

export const DateFilter: FC = () => {
  const { filterType, pickerElement, handleInputTypeChange, queryParams } = useHandleDateFilter()
  const { setIsFilterMenuOpen } = useFilterPill()

  return (
    <>
      <Select
        comboboxProps={{ withinPortal: false }}
        data={DATE_FILTER_RENDER_OPTIONS}
        value={filterType}
        onChange={handleInputTypeChange}
      />
      <Box pl='sm'>{pickerElement}</Box>
      <Link
        to='.'
        search={(prev) => {
          if (queryParams === null) return prev
          return queryParams
        }}
        style={{ textDecoration: 'none' }}
      >
        <Button onClick={() => setIsFilterMenuOpen(false)} fullWidth>
          Apply
        </Button>
      </Link>
    </>
  )
}
