import { FC } from 'react'
import {
  ActionIcon,
  Anchor,
  AppShell,
  Avatar,
  Burger,
  Divider,
  Group,
  Menu,
  Text,
  Tooltip,
  UnstyledButton,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Link, Outlet } from '@tanstack/react-router'
import { IconHelp } from '@tabler/icons-react'
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import classes from './styles.module.scss'

export const Layout: FC = () => {
  const [opened, { toggle }] = useDisclosure()

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
        padding='md'
      >
        <AppShell.Header>
          <Group h='100%' px='md'>
            <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
            <Group justify='space-between' style={{ flex: 1 }}>
              <Group visibleFrom='sm'>
                {/* <Anchor
                  component={Link}
                  to='/calendar'
                  activeProps={{
                    className: classes.activeLink,
                  }}
                >
                  Calendar
                </Anchor> */}
                <Anchor
                  component={Link}
                  to='/time-entries'
                  activeProps={{
                    className: classes.activeLink,
                  }}
                >
                  Time Entry
                </Anchor>
                <Anchor
                  component={Link}
                  to='/expenses'
                  activeProps={{
                    className: classes.activeLink,
                  }}
                >
                  Expense
                </Anchor>
                <Anchor
                  component={Link}
                  to='/billing'
                  activeProps={{
                    className: classes.activeLink,
                  }}
                >
                  Billing
                </Anchor>
                <Anchor
                  component={Link}
                  to='/clients'
                  activeProps={{
                    className: classes.activeLink,
                  }}
                >
                  Client
                </Anchor>
                <Anchor
                  component={Link}
                  to='/matters'
                  activeProps={{
                    className: classes.activeLink,
                  }}
                >
                  Matter
                </Anchor>
                <Anchor
                  component={Link}
                  to='/reporting'
                  activeProps={{
                    className: classes.activeLink,
                  }}
                >
                  Reporting
                </Anchor>
              </Group>
              <Group>
                <Link to='/help'>
                  <Tooltip label='Help' openDelay={700}>
                    <ActionIcon variant='transparent'>
                      <IconHelp stroke={1.5} />
                    </ActionIcon>
                  </Tooltip>
                </Link>
                {/* <Link to='/settings'>
                  <ActionIcon variant='transparent'>
                    <IconSettings stroke={1.5} />
                  </ActionIcon>
                </Link> */}
                <Menu>
                  <Menu.Target>
                    <Avatar style={{ cursor: 'pointer' }} size={30}>
                      K
                    </Avatar>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>Kristine Roper</Menu.Label>
                    <Menu.Item>Profile</Menu.Item>
                    <Menu.Item>
                      <Link style={{ color: 'inherit', textDecoration: 'none' }} to='/settings'>
                        Settings
                      </Link>
                    </Menu.Item>
                    <Menu.Item c='red'>Logout</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
                <Divider orientation='vertical' />
                <Text>Powered by FAKE APP</Text>
              </Group>
            </Group>
          </Group>
        </AppShell.Header>

        <AppShell.Navbar py='md' px={4}>
          <UnstyledButton className={classes.control}>Home</UnstyledButton>
          <UnstyledButton className={classes.control}>Blog</UnstyledButton>
          <UnstyledButton className={classes.control}>Contacts</UnstyledButton>
          <UnstyledButton className={classes.control}>Support</UnstyledButton>
        </AppShell.Navbar>

        <AppShell.Main bg='gray.2'>
          <Outlet />
        </AppShell.Main>
      </AppShell>
      {/* <ReactQueryDevtools buttonPosition='top-right' /> */}
      {/* <TanStackRouterDevtools position='bottom-right' /> */}
    </>
  )
}
