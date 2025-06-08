import { FC, MouseEventHandler } from 'react'
import { IconCirclePlus, IconXboxX } from '@tabler/icons-react'
import { Divider, Flex, Menu, Pill, Stack, Text } from '@mantine/core'
import classnames from 'classnames'

import { FilterConfig } from '../../config'
import classes from './styles.module.scss'
import { routeApi } from '@/routes/time-entries/-util'
import { useFilterPill } from './useFilterPillContext'

const { useSearch, useNavigate } = routeApi

export const FilterPill: FC<FilterPillProps> = ({ filter }) => {
  const { isFilterMenuOpen, setIsFilterMenuOpen } = useFilterPill()
  const searchParams = useSearch()
  const navigate = useNavigate()

  const handleClearFilter: MouseEventHandler<SVGSVGElement> = (e) => {
    e.stopPropagation()
    navigate({
      search(prev) {
        const newSearch = { ...prev }
        delete newSearch[filter.key]
        return newSearch
      },
    })
  }

  const existingFilter = searchParams[filter.key]

  return (
    <Menu
      opened={isFilterMenuOpen}
      onChange={setIsFilterMenuOpen}
      position='bottom-start'
      withArrow
      arrowSize={10}
      width={300}
      shadow='xl'
    >
      <Menu.Target>
        <Pill
          bg='white'
          key={filter.key}
          className={classnames({
            [classes.openMenu]: isFilterMenuOpen || existingFilter !== undefined,
            [classes.menu]: !isFilterMenuOpen,
            [classes.pill]: true,
          })}
        >
          <Flex pt='2' pr='3' align='center' gap='5px'>
            {existingFilter ? (
              <IconXboxX onClick={handleClearFilter} size={14} color='red' />
            ) : (
              <IconCirclePlus size={14} />
            )}
            <Text fz='sm' c='black'>
              {filter.label}
            </Text>
            {existingFilter ? (
              <>
                <Divider orientation='vertical' />
                <Text fz='sm' c='blue'>
                  {formatFilterValue(existingFilter)}
                </Text>
              </>
            ) : null}
          </Flex>
        </Pill>
      </Menu.Target>
      <Menu.Dropdown>
        <Stack p='5'>
          <Text fz='md' fw={700}>
            Filter by {filter.label}
          </Text>
          {filter.component ? filter.component : null}
        </Stack>
      </Menu.Dropdown>
    </Menu>
  )
}

type FilterPillProps = {
  filter: FilterConfig
}

const formatFilterValue = (value: string | string[] | number) => {
  if (Array.isArray(value)) {
    return value.join(',')
  }

  switch (typeof value) {
    case 'string':
      return value
    case 'number':
      return value.toString()
    default:
      return value
  }
}
