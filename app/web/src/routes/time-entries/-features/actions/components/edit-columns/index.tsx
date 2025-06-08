import { FC } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { useLocalStorage } from '@mantine/hooks'
import { IconGripVertical } from '@tabler/icons-react'
import { Card, Checkbox, Flex, Menu, Stack, Text, ThemeIcon } from '@mantine/core'

import { ColumnSetting, getColumnConfig } from '@/routes/time-entries/-features/table/hooks/useEditColumns'
import classes from './styles.module.scss'

const reorder = (list: ColumnSetting[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export const TimeEntryColumnEdit: FC = () => {
  const [columns, setColumns] = useLocalStorage({
    key: 'time-entry-columns',
    defaultValue: getColumnConfig(),
  })

  const activeColumns: ColumnSetting[] = []
  const inactiveColumns: ColumnSetting[] = []
  for (const column of columns) {
    if (column.enabled) {
      activeColumns.push(column)
    } else {
      inactiveColumns.push(column)
    }
  }

  const handleToggle = (columnId: string, shouldBeEnabled: boolean) => {
    setColumns((prev) => {
      const updatedColumns = [...prev]
      const index = updatedColumns.findIndex((column) => column.id === columnId)
      updatedColumns[index].enabled = shouldBeEnabled
      return updatedColumns
    })
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const reorderedItems = reorder(activeColumns, result.source.index, result.destination.index)
    setColumns([...reorderedItems, ...inactiveColumns])
  }

  return (
    <>
      <Menu.Label>Active columns</Menu.Label>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided) => (
            <Stack gap={0} {...provided.droppableProps} ref={provided.innerRef}>
              {activeColumns.map((column, index) => (
                <Draggable key={column.id} draggableId={column.id} index={index}>
                  {(provided, snapshot) => (
                    <Card
                      className={classes.draggable}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={provided.draggableProps.style}
                      bg={snapshot.isDragging ? 'blue.1' : 'white'}
                      pl={0}
                      py={0}
                    >
                      <Flex gap='xs' align='center'>
                        <Checkbox
                          size='xs'
                          checked={column.enabled}
                          onChange={({ target }) => handleToggle(column.id, target.checked)}
                        />
                        <Text flex={1}>{column.content}</Text>
                        <ThemeIcon variant='transparent' color='blue' size={24} radius='xl'>
                          <IconGripVertical size={16} />
                        </ThemeIcon>
                      </Flex>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Stack>
          )}
        </Droppable>
      </DragDropContext>
      <Menu.Label>Available columns</Menu.Label>
      <Stack gap='0'>
        {inactiveColumns.map((column) => {
          return (
            <Flex gap='xs' key={column.id} align='center'>
              <Checkbox
                size='xs'
                checked={column.enabled}
                onChange={({ target }) => handleToggle(column.id, target.checked)}
              />
              <Text flex={1}>{column.content}</Text>
            </Flex>
          )
        })}
      </Stack>
    </>
  )
}
