import { useEffect, useState } from 'react'
import { Group, NumberInput, Select, Text } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { IconCalendar } from '@tabler/icons-react'
import {
  buildBeforeOrOnTimestampFilter,
  buildBetweenTimestampFilter,
  buildEqualTimestampFilter,
  buildOnOrAfterTimestampFilter,
  buildWithinLastTimestampFilter,
  TimeUnitIdentifier,
} from './query'

export const useHandleDateFilter = () => {
  const [filterType, setFilterType] = useState<DateFilterOption | null>(DATE_FILTER_RENDER_OPTIONS[0].value)
  const [primaryTimeStamp, setPrimaryTimeStamp] = useState<number | null>(null)
  const [secondaryTimeStamp, setSecondaryTimeStamp] = useState<number | null>(null)
  const [timeUnit, setTimeUnit] = useState<number | null>(null)
  const [timeUnitIdent, setTimeUnitIdent] = useState<TimeUnitIdentifier | null>(null)

  useEffect(() => {
    setPrimaryTimeStamp(null)
    setSecondaryTimeStamp(null)
  }, [filterType])

  const handleInputTypeChange = (value: string | null) => {
    if (!value) return
    if (!DATE_FILTER_MAP[value as DateFilterOption]) return
    setFilterType(value as DateFilterOption)
  }

  const handlePrimaryTimeStampChange = (value: number | string | Date | null) => {
    if (!value) return
    if (typeof value === 'number') {
      setPrimaryTimeStamp(value)
      return
    }
    if (typeof value === 'string') {
      setPrimaryTimeStamp(Number(value))
      return
    }
    setPrimaryTimeStamp(value.getTime())
  }

  const handleSecondaryTimeStampChange = (value: Date | null) => {
    if (!value) return
    setSecondaryTimeStamp(value.getTime())
  }

  const queryParams = constructDateFilterQuery(
    filterType,
    timeUnit,
    primaryTimeStamp,
    secondaryTimeStamp,
    timeUnitIdent,
  )

  const primaryTimeStampAsDate = primaryTimeStamp ? new Date(primaryTimeStamp) : null
  const secondaryTimeStampAsDate = secondaryTimeStamp ? new Date(secondaryTimeStamp) : null

  let pickerElement: JSX.Element | null = null
  if (filterType) {
    const { inputType } = DATE_FILTER_MAP[filterType]
    switch (inputType) {
      case 'number':
        pickerElement = (
          <Group wrap='nowrap' gap='xs'>
            <NumberInput value={timeUnit || undefined} onChange={(newTimeUnit) => setTimeUnit(newTimeUnit as number)} />
            <Select
              w='40%'
              value={timeUnitIdent}
              onChange={(value) => setTimeUnitIdent(value as TimeUnitIdentifier)}
              comboboxProps={{ withinPortal: false }}
              defaultValue={TIME_UNIT_SELECT_OPTIONS[0].value}
              data={TIME_UNIT_SELECT_OPTIONS}
            />
          </Group>
        )
        break
      case 'date':
        pickerElement = (
          <DateInput
            value={primaryTimeStampAsDate}
            onChange={handlePrimaryTimeStampChange}
            popoverProps={{ withinPortal: false }}
            leftSection={<IconCalendar size={16} />}
          />
        )
        break
      case 'date-range':
        pickerElement = (
          <Group gap='xs' wrap='nowrap'>
            <DateInput
              value={primaryTimeStampAsDate}
              onChange={handlePrimaryTimeStampChange}
              popoverProps={{ withinPortal: false }}
              leftSection={<IconCalendar size={16} />}
            />
            <Text>and</Text>
            <DateInput
              value={secondaryTimeStampAsDate}
              onChange={handleSecondaryTimeStampChange}
              popoverProps={{ withinPortal: false }}
              leftSection={<IconCalendar size={16} />}
            />
          </Group>
        )
        break
      default:
        break
    }
  }

  return {
    filterType,
    primaryTimeStamp,
    secondaryTimeStamp,
    timeUnitIdent,
    handleInputTypeChange,
    handlePrimaryTimeStampChange,
    handleSecondaryTimeStampChange,
    queryParams,
    primaryTimeStampAsDate,
    secondaryTimeStampAsDate,
    pickerElement,
  }
}

type TimeUnitSelectOption = { value: TimeUnitIdentifier; label: string }
const TIME_UNIT_SELECT_OPTIONS: TimeUnitSelectOption[] = [
  { value: 'hours', label: 'Hours' },
  { value: 'days', label: 'Days' },
  { value: 'months', label: 'Months' },
]

type DateFilterOption = 'last' | 'equal' | 'between' | 'onOrAfter' | 'beforeOrOn'
type DateFilterConfig = {
  label: string
  inputType: 'number' | 'date' | 'date-range'
}
type DateFilterMap = {
  [key in DateFilterOption]: DateFilterConfig
}

const DATE_FILTER_MAP: DateFilterMap = {
  last: {
    label: 'Within the last',
    inputType: 'number',
  },
  equal: {
    label: 'Equal to',
    inputType: 'date',
  },
  between: {
    label: 'Between',
    inputType: 'date-range',
  },
  onOrAfter: {
    label: 'On or After',
    inputType: 'date',
  },
  beforeOrOn: {
    label: 'Before or On',
    inputType: 'date',
  },
}

export const DATE_FILTER_RENDER_OPTIONS: { value: DateFilterOption; label: string }[] = Object.entries(
  DATE_FILTER_MAP,
).map(([key, value]) => {
  return {
    value: key as DateFilterOption,
    label: value.label,
  }
})

const constructDateFilterQuery = (
  filterType: DateFilterOption | null,
  timeUnit: number | null,
  primaryTimeStamp: number | null,
  secondaryTimeStamp: number | null,
  timeUnitIdent: TimeUnitIdentifier | null,
) => {
  if (!filterType) return null
  switch (filterType) {
    case 'last':
      return buildWithinLastTimestampFilter(timeUnit, timeUnitIdent)
    case 'equal':
      return buildEqualTimestampFilter(primaryTimeStamp)
    case 'between':
      return buildBetweenTimestampFilter(primaryTimeStamp, secondaryTimeStamp)
    case 'onOrAfter':
      return buildOnOrAfterTimestampFilter(primaryTimeStamp)
    case 'beforeOrOn':
      return buildBeforeOrOnTimestampFilter(primaryTimeStamp)
    default:
      return null
  }
}
