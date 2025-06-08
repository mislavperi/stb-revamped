import { MouseEventHandler } from 'react'
import { IconCirclePlus, IconXboxX } from '@tabler/icons-react'
import { Divider, Flex, Menu, Pill, Stack, Text } from '@mantine/core'
import classnames from 'classnames'
import { useNavigate, useSearch } from '@tanstack/react-router'

import { FilterConfig } from '../../config'
import { useFilterPill } from './useFilterPillContext'
import classes from './styles.module.scss'

export const FilterPill = function <TParams>({ filter }: FilterPillProps<TParams>) {
  const { isFilterMenuOpen, setIsFilterMenuOpen } = useFilterPill()
  const searchParams = useSearch({ strict: false }) as unknown as TParams
  const navigate = useNavigate()

  const handleClearFilter: MouseEventHandler<SVGSVGElement> = (e) => {
    e.stopPropagation()
    navigate({
      //@ts-expect-error there is not a way to make this generic
      search(prev: TParams) {
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
          size='lg'
          key={filter.key as string}
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
            <Text fz='xs' c='black'>
              {filter.label}
            </Text>
            {existingFilter ? (
              <>
                <Divider orientation='vertical' />
                <Text fz='sm' c='blue'>
                  {filter.formatValue ? filter.formatValue(existingFilter) : formatFilterValue(existingFilter)}
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

type FilterPillProps<TParams> = {
  filter: FilterConfig<TParams>
}

const formatFilterValue = function <TValue>(value: TValue): React.ReactNode {
  if (Array.isArray(value)) {
    return value.join(',')
  }

  switch (typeof value) {
    case 'string':
      return value
    case 'number':
      return value.toString()
    default:
      return value as React.ReactNode
  }
}
