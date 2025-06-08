import { getRouteApi } from '@tanstack/react-router'
import * as z from 'zod'

export const TimePeriodLteKey = 'timePeriod[lte]'
export const TimePeriodGteKey = 'timePeriod[gte]'
export const TimePeriodKey = 'timePeriod'

export type TimeEntrySearchParams = {
  [TimePeriodLteKey]?: number
  [TimePeriodGteKey]?: number
  [TimePeriodKey]?: number
  workedBy?: string[]
  matter?: string[]
  client?: string[]
  billedStatus?: string
  page?: number
  itemsPerPage?: number
  q?: string
}

export const timeEntrySearchParamsSchema = z.object({
  [TimePeriodGteKey]: z.number().optional(),
  [TimePeriodLteKey]: z.number().optional(),
  [TimePeriodKey]: z.number().optional(),
  workedBy: z.array(z.string()).optional(),
  matter: z.array(z.string()).optional(),
  client: z.array(z.string()).optional(),
  billedStatus: z.string().optional(),
  page: z.number().optional(),
  itemsPerPage: z.number().optional(),
  q: z.string().optional(),
}) satisfies z.ZodType<TimeEntrySearchParams>

export const routeApi = getRouteApi('/time-entries/')
