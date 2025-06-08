import { FC, useState } from 'react'
import { Button, ComboboxData, Select } from '@mantine/core'
import { useSearch, Link } from '@tanstack/react-router'

import { useFilterPill } from '../pill/useFilterPillContext'

export const SelectFilter: FC<SelectFilterProps> = ({ options, paramsKey, defaultValue = null }) => {
  const searchParams = useSearch({ strict: false }) as unknown as Record<string, string>
  const existingFilter = searchParams[paramsKey]
  const { setIsFilterMenuOpen } = useFilterPill()
  const [selectedOption, setSelectedOption] = useState<string | null>(existingFilter ?? defaultValue)

  return (
    <>
      <Select
        value={selectedOption}
        onChange={setSelectedOption}
        data={options}
        defaultValue={defaultValue}
        comboboxProps={{ withinPortal: false }}
      />
      <Link
        to='.'
        search={(prev) => {
          if (selectedOption === null) return prev
          return {
            ...prev,
            [paramsKey]: selectedOption,
          }
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

type SelectFilterProps = {
  options: ComboboxData
  paramsKey: string
  defaultValue?: string
}
