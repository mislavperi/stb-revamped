import { createFileRoute, RouteComponent } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import {
  Group,
  Card,
  Stack,
  Menu,
  ActionIcon,
  Title,
  Flex,
} from '@mantine/core'
import { IconDots, IconEye, IconFileZip, IconTrash } from '@tabler/icons-react'

import { DefaultErrorDisplay } from '@/components'
import { getQueryOptions } from './-features/farm-path'
import { UnitDisplay } from './-features/farm-path/components'

const FarmPathDetailsPage: RouteComponent = () => {
  const uuid = Route.useParams().uuid
  const { data: farmPath } = useSuspenseQuery(getQueryOptions(uuid))

  return (
    <div className="space-y-2">
      <Title className="text-xl font-bold underline">{farmPath.name}</Title>
      <Stack>
        {farmPath.steps.map((step, index) => {
          return (
            <Group gap="md">
              <Flex w="100px" justify="center" align="center">
                <Title>{index + 1}.</Title>
              </Flex>
              <Card
                w="60%"
                key={step.name}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
              >
                <Stack>
                  <Card.Section withBorder inheritPadding>
                    <Group justify="space-between">
                      <Title py="xs" order={3}>
                        {step.name}
                      </Title>
                      <Menu withinPortal position="bottom-end" shadow="sm">
                        <Menu.Target>
                          <ActionIcon variant="subtle" color="gray">
                            <IconDots />
                          </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                          <Menu.Item leftSection={<IconFileZip size={14} />}>
                            Download zip
                          </Menu.Item>
                          <Menu.Item leftSection={<IconEye size={14} />}>
                            Preview all
                          </Menu.Item>
                          <Menu.Item
                            leftSection={<IconTrash size={14} />}
                            color="red"
                          >
                            Delete all
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Group>
                  </Card.Section>
                  <Group justify="space-between" px="md" pt="lg">
                    {step.units.map((unit) => {
                      return <UnitDisplay key={unit.slug} {...unit} />
                    })}
                  </Group>
                </Stack>
              </Card>
            </Group>
          )
        })}
      </Stack>
    </div>
  )
}

export const Route = createFileRoute('/time-entries/$uuid/')({
  loader: ({ context: { queryClient }, params: { uuid } }) => {
    return queryClient.ensureQueryData(getQueryOptions(uuid))
  },
  errorComponent: DefaultErrorDisplay,
  component: FarmPathDetailsPage,
})
