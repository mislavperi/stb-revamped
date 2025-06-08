import { FC } from 'react'
import { Group, Select, SelectProps, Text } from '@mantine/core'
import { routeApi } from '@/routes/time-entries/-util'

const { useSearch, useNavigate } = routeApi

export const RowsPerPageSelector: FC<RowsPerPageSelectorProps> = ({ w, options = ['10', '25', '50'] }) => {
  const { itemsPerPage = Number(options[0]) } = useSearch()
  const navigate = useNavigate()

  const handleSelectChange = (value: string | null) => {
    navigate({
      search(prev) {
        if (!value) return prev
        return { ...prev, itemsPerPage: Number(value) }
      },
    })
  }

  return (
    <Group>
      <Text>Rows per page</Text>
      <Select w={w} value={itemsPerPage.toString()} onChange={handleSelectChange} data={options} />
    </Group>
  )
}

type RowsPerPageSelectorProps = {
  w: SelectProps['w']
  options?: string[]
}
