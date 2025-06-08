import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorComponent, ErrorRouteComponent, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'

export const DefaultErrorDisplay: ErrorRouteComponent = ({ error }) => {
  const router = useRouter()
  const queryErrorResetBoundary = useQueryErrorResetBoundary()

  useEffect(() => {
    queryErrorResetBoundary.reset()
  }, [queryErrorResetBoundary])

  if (error instanceof NotFoundError) {
    return <div>{error.message}</div>
  }

  return (
    <div>
      <button
        onClick={() => {
          router.invalidate()
        }}
      >
        retry
      </button>
      <ErrorComponent error={error} />
    </div>
  )
}

export class NotFoundError extends Error {}