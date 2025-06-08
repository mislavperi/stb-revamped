/// <reference types="vite/client" />

declare global {
  interface Window {
    Clerk?: {
      session?: {
        getToken(): Promise<string | null>
      }
    }
  }
}

export {}
