import { FC } from 'react'
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { Card, Group, Space, Stack, Text, Title } from '@mantine/core'

import { DefaultErrorDisplay } from '@/components'

const HomePage: FC = () => {
  return (
    <Stack>
      <Text>What are you here for?</Text>
      <Space h='xl' />
      <Group>
        <Link to='/time-entries' style={{ textDecoration: 'none' }}>
          <Card shadow='sm' padding='lg' radius='md' withBorder maw='350px'>
            <Group justify='space-between' mb='xs'>
              <Title order={3}>Time Entries</Title>
            </Group>

            <Text size='sm' c='dimmed'>
              Track time entries for your team.
            </Text>
          </Card>
        </Link>
      </Group>
    </Stack>
  )
}
export const Route = createLazyFileRoute('/')({
  component: HomePage,
  errorComponent: DefaultErrorDisplay,
})
