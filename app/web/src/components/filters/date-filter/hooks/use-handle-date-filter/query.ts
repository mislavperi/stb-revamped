import dayjs from 'dayjs'
import { TimePeriodGteKey, TimePeriodKey, TimePeriodLteKey } from '@/routes/time-entries/-util'

export const buildWithinLastTimestampFilter = (timeUnit: number | null, timeUnitIdent: TimeUnitIdentifier | null) => {
  if (timeUnit === null || timeUnitIdent === null) return null
  const timeStamp = dayjs().subtract(timeUnit, timeUnitIdent).unix()
  return { [TimePeriodGteKey]: timeStamp }
}

export const buildEqualTimestampFilter = (timeUnit: number | null) => {
  if (timeUnit === null) return null
  const timeStamp = dayjs(timeUnit).unix()
  return { [TimePeriodKey]: timeStamp }
}

export const buildBetweenTimestampFilter = (primaryTimeUnit: number | null, secondaryTimeUnit: number | null) => {
  if (primaryTimeUnit === null || secondaryTimeUnit === null) return null
  const primaryTimeStamp = dayjs(primaryTimeUnit).unix()
  const secondaryTimeStamp = dayjs(secondaryTimeUnit).unix()
  return { [TimePeriodGteKey]: primaryTimeStamp, [TimePeriodLteKey]: secondaryTimeStamp }
}

export const buildOnOrAfterTimestampFilter = (timeUnit: number | null) => {
  if (timeUnit === null) return null
  const timeStamp = dayjs(timeUnit).unix()
  return { [TimePeriodGteKey]: timeStamp }
}

export const buildBeforeOrOnTimestampFilter = (timeUnit: number | null) => {
  if (timeUnit === null) return null
  const timeStamp = dayjs(timeUnit).unix()
  return { [TimePeriodLteKey]: timeStamp }
}

export type TimeUnitIdentifier = dayjs.ManipulateType
