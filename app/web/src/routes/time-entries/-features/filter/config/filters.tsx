import { TimeEntrySearchParams } from '@/routes/time-entries/-util/route'
import { DateFilter } from '@/components/filters'

import { ClientFilter, MatterFilter, WorkedByFilter, BilledStatusFilter } from '../components'
import { JSX } from 'react'

export type FilterConfig = {
  label: string
  key: keyof TimeEntrySearchParams
  component?: JSX.Element
}

export const filters: FilterConfig[] = [
  {
    label: 'Time Period',
    key: 'timePeriod',
    component: <DateFilter />,
  },
  {
    label: 'Billed Status',
    key: 'billedStatus',
    component: <BilledStatusFilter />,
  },
  {
    label: 'Worked By',
    key: 'workedBy',
    component: <WorkedByFilter />,
  },
  {
    label: 'Client',
    key: 'client',
    component: <ClientFilter />,
  },
  {
    label: 'Matter',
    key: 'matter',
    component: <MatterFilter />,
  },
]
