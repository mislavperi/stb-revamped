import { FC } from 'react'
import { Anchor, Breadcrumbs, Flex, Title } from '@mantine/core'
import { Link } from '@tanstack/react-router'

export const PageHeader: FC<PageHeaderProps> = ({ title, breadcrumbs = [], rightAction = null }) => {
  // const breadCrumbsMinusLast = breadcrumbs.slice(0, breadcrumbs.length - 1)
  return (
    <>
      {breadcrumbs.length === 0 ? null : (
        <Breadcrumbs>
          {breadcrumbs.map((item, index) => (
            <Anchor component={Link} to={item.to} key={index}>
              {item.title}
            </Anchor>
          ))}
        </Breadcrumbs>
      )}
      <Flex justify='space-between' align='flex-end'>
        <Title order={1}>{title}</Title>
        {rightAction}
      </Flex>
    </>
  )
}

type PageHeaderProps = {
  title: string
  breadcrumbs?: { title: string; to: string }[]
  rightAction?: React.ReactNode
}
