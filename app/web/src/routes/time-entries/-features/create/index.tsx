import { FC } from 'react'
import {
  Button,
  CloseButton,
  Flex,
  Grid,
  ScrollArea,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { IconExternalLink } from '@tabler/icons-react'

export const CreateTimeEntry: FC = () => {
  return (
    <Stack w={{ base: '90%', md: '25vw' }} p='xs'>
      <Flex justify='space-between'>
        <Title order={2} fz='md'>
          Create Time Entry{' '}
          <Text span fw='normal'>
            (express)
          </Text>
        </Title>

        <CloseButton />
      </Flex>
      <ScrollArea h='50vh'>
        <Grid>
          {/* <Grid.Col span={6}>
                  <Select required label='Timekeeper' />
                </Grid.Col> */}
          <Grid.Col span={12}>
            <DateInput required label='Date' />
          </Grid.Col>
          <Grid.Col span={{ base: 12 }}>
            <Select required label='Client' />
          </Grid.Col>
          <Grid.Col span={{ base: 12 }}>
            <Select required label='Project' />
          </Grid.Col>
          <Grid.Col span={{ base: 12 }}>
            <Textarea label='Description' />
          </Grid.Col>
          <Grid.Col span={{ base: 12 }}>
            <Select required label='Category' searchable data={['Some Category', 'Some other category']} />
          </Grid.Col>
          <Grid.Col span={{ base: 12 }}>
            <Textarea label='Notes' />
          </Grid.Col>
          {/* <Grid.Col span={7}>
                    <SegmentedControl data={['Hours', 'Start/End']} />
                  </Grid.Col> */}
          {/* <Grid.Col span={5} style={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox label='Billable' />
                  </Grid.Col> */}
          <Grid.Col span={5}>
            <TextInput required label='Hours' />
          </Grid.Col>
          <Grid.Col span={7} style={{ display: 'flex', alignItems: 'flex-end' }}>
            <Button rightSection={<IconExternalLink />} variant='light'>
              Open Full
            </Button>
          </Grid.Col>
          {/* <Grid.Col span={12}>
                    <Title order={3}>Rate</Title>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Select label='Type' data={['Standard', 'Custom']} />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <TextInput label='Amount' leftSection='$' />
                  </Grid.Col> */}
        </Grid>
      </ScrollArea>
      <Text fw='bold' fz='sm'>
        4 out of 8 required fields completed
      </Text>
      <Button disabled>Create</Button>
    </Stack>
  )
}
