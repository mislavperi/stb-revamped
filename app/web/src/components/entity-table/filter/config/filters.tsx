import { JSX } from "react"

export type FilterConfig<TParams> = {
  label: string
	formatValue?: (value: TParams[keyof TParams]) => string
  key: keyof TParams
  component?: JSX.Element
}
