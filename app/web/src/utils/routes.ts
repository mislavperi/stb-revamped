import { safelyGetEnvVar } from './env'

const appUrl = safelyGetEnvVar('VITE_APP_URL')

export const getPropertyListUrl = (slug: string) => {
  return `${appUrl}/homes-for-sale/just-for-you/${slug}`
}
