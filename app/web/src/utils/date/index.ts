import dayjs from "dayjs"
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(advancedFormat)

export const safeParseDate = (dateString: string | Date | null = null): dayjs.Dayjs | null => {
  const parsedDate = dayjs(dateString)
  return parsedDate.isValid() ? parsedDate : null
}