import { TimeEntrySearchParams } from '@/routes/time-entries/-util'
import type { TimeEntry } from './types'

export const filterTimeEntries = (searchParams: TimeEntrySearchParams, allRows: TimeEntry[]): TimeEntry[] => {
  const results: TimeEntry[] = []

  const conditions: FilterCondition[] = []
  if (searchParams.matter) {
    conditions.push(filterByMatter(searchParams.matter))
  }
  if (searchParams.client) {
    conditions.push(filterByClient(searchParams.client))
  }
  if (searchParams.workedBy) {
    conditions.push(filterByWorkedBy(searchParams.workedBy))
  }

  for (const timeEntry of allRows) {
    if (conditions.every((condition) => condition(timeEntry))) {
      results.push(timeEntry)
    }
  }

  return results
}

type FilterCondition = (timeEntry: TimeEntry) => boolean

const filterByMatter: (matter: string[]) => FilterCondition = (matter) => {
  return (timeEntry) => {
    return timeEntry.matter === matter[0]
  }
}

const filterByClient: (client: string[]) => FilterCondition = (client) => {
  return (timeEntry) => {
    return timeEntry.client === client[0]
  }
}

const filterByWorkedBy: (workedByName: string[]) => FilterCondition = (workedByName) => {
  return (timeEntry) => {
    return timeEntry.workedByName === workedByName[0]
  }
}
