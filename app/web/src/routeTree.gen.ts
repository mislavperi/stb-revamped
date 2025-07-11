/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TimeEntriesIndexImport } from './routes/time-entries/index'
import { Route as TimeEntriesUuidIndexImport } from './routes/time-entries/$uuid/index'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const TimeEntriesIndexRoute = TimeEntriesIndexImport.update({
  id: '/time-entries/',
  path: '/time-entries/',
  getParentRoute: () => rootRoute,
} as any)

const TimeEntriesUuidIndexRoute = TimeEntriesUuidIndexImport.update({
  id: '/time-entries/$uuid/',
  path: '/time-entries/$uuid/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/time-entries/': {
      id: '/time-entries/'
      path: '/time-entries'
      fullPath: '/time-entries'
      preLoaderRoute: typeof TimeEntriesIndexImport
      parentRoute: typeof rootRoute
    }
    '/time-entries/$uuid/': {
      id: '/time-entries/$uuid/'
      path: '/time-entries/$uuid'
      fullPath: '/time-entries/$uuid'
      preLoaderRoute: typeof TimeEntriesUuidIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/time-entries': typeof TimeEntriesIndexRoute
  '/time-entries/$uuid': typeof TimeEntriesUuidIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/time-entries': typeof TimeEntriesIndexRoute
  '/time-entries/$uuid': typeof TimeEntriesUuidIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/time-entries/': typeof TimeEntriesIndexRoute
  '/time-entries/$uuid/': typeof TimeEntriesUuidIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/time-entries' | '/time-entries/$uuid'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/time-entries' | '/time-entries/$uuid'
  id: '__root__' | '/' | '/time-entries/' | '/time-entries/$uuid/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  TimeEntriesIndexRoute: typeof TimeEntriesIndexRoute
  TimeEntriesUuidIndexRoute: typeof TimeEntriesUuidIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  TimeEntriesIndexRoute: TimeEntriesIndexRoute,
  TimeEntriesUuidIndexRoute: TimeEntriesUuidIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/time-entries/",
        "/time-entries/$uuid/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/time-entries/": {
      "filePath": "time-entries/index.tsx"
    },
    "/time-entries/$uuid/": {
      "filePath": "time-entries/$uuid/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
