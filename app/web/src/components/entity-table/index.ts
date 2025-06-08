export * from './Provider'
export * from './Table'
export * from './useTableOps'
export * from './column-edit'
export * from './filter'

declare module '@tanstack/react-table' {
  // @ts-expect-error overriding the type
  interface ColumnMeta {
    alignHeader?: 'left' | 'center' | 'right'
    shouldHideInColumnEdit?: boolean
  }
}