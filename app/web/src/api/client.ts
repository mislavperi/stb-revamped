import createClient, { Middleware } from 'openapi-fetch'
import type { paths } from './types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string
if (typeof API_BASE_URL !== 'string') {
  throw new Error('VITE_API_BASE_URL is not defined')
}

const tokenMiddleware: Middleware = {
  async onRequest({ request }) {
    request.headers.set('Authorization', 'Bearer FAKE_TOKEN')
    return request
  },
}

export const client = createClient<paths>({ baseUrl: API_BASE_URL })
client.use(tokenMiddleware)
