import { routeApi, TimeEntrySearchParams } from '@/routes/time-entries/-util'

const { useNavigate, useSearch } = routeApi

export const useHandleMultiSelectQueryParam = (searchParamKey: keyof TimeEntrySearchParams) => {
  const navigate = useNavigate()
  const searchParams = useSearch()

  const handleChange = (newList: string[]) => {
    navigate({
      search: (prev) => {
        const isListEmpty = newList.length === 0
        return { ...prev, [searchParamKey]: isListEmpty ? undefined : newList }
      },
    })
  }

  return { handleChange, searchParams }
}
