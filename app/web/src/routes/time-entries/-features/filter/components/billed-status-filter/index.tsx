import { FC, useState } from 'react'
import { Button, Select } from '@mantine/core'
import { Link } from '@tanstack/react-router'
import { routeApi } from '@/routes/time-entries/-util'
import { useFilterPill } from '../pill/useFilterPillContext'

const { useSearch } = routeApi

export const BilledStatusFilter: FC = () => {
  const { billedStatus = null } = useSearch()
  const { setIsFilterMenuOpen } = useFilterPill()
  const [mutableBilledStatus, setMutableBilledStatus] = useState<string | null>(billedStatus)

  return (
    <>
      <Select
        value={mutableBilledStatus}
        onChange={(value) => setMutableBilledStatus(value)}
        data={['Ask Kristine', 'Draft', 'Open', 'Paid']}
        defaultValue={'Ask Kristine'}
        comboboxProps={{ withinPortal: false }}
      />
      <Link
        to='.'
        search={(prev) => {
          if (mutableBilledStatus === null) return prev
          return {
            ...prev,
            billedStatus: mutableBilledStatus,
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
