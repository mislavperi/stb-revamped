import { Link, createRootRouteWithContext } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import { Layout } from '@/components'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: Layout,
  notFoundComponent: () => {
    return (
      <div>
        <p>This is the notFoundComponent configured on root route</p>
        <Link to='/'>Start Over</Link>
      </div>
    )
  },
})