import { Dispatch, FC, SetStateAction } from 'react'
import { Select, SelectProps } from '@mantine/core'

import { mlsOptions } from './getMlsLabel'

export const MlsSelector: FC<MlsSelectorProps> = ({ mls, setMls, selectProps }) => {
  const handleChange = (value: string | null) => {
    if (value) {
      setMls(value)
    }
  }
  return <Select required clearable searchable data={mlsOptions} value={mls} onChange={handleChange} label='MLS' {...selectProps} />
}

type MlsSelectorProps = {
  mls: string
  setMls: Dispatch<SetStateAction<string>>
	selectProps?: SelectProps
}
