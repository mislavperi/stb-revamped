import { TimeEntrySearchParams } from '@/routes/time-entries/-util'
import { client } from '@/api/client'
import { components } from '@/api/types'

export type TimeEntry = components['schemas']['TimeEntry']

export async function fetchTimeEntries(_: TimeEntrySearchParams['q']): Promise<TimeEntry[]> {
  // Simulate some network latency
  await new Promise((r) => setTimeout(r, 500))
  const { data, error } = await client.GET('/time-entry')
  if (error) {
    throw error
  } 
  return data
}
