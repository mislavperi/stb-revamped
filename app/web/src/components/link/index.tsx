import { FC, PropsWithChildren } from 'react'
import { Anchor, AnchorProps } from '@mantine/core'
import { Link as RouterLink, LinkProps as RouterLinkProps } from '@tanstack/react-router'

export const Link: FC<LinkProps> = ({ children, ...linkProps }) => {
  return (
    <Anchor {...linkProps} renderRoot={(props) => <RouterLink {...props} />}>
      {children}
    </Anchor>
  )
}

type LinkProps = PropsWithChildren<RouterLinkProps & AnchorProps>
