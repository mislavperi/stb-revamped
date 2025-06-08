export const mlsOptions = [
  { label: 'Harris', value: '67' },
  { label: 'Dallas', value: '37' },
  { label: 'Austin', value: '105' },
]

export const getMlsLabelForMlsSid = (mlsSid: string | number): string => {
	mlsSid = mlsSid.toString()
  const mls = mlsOptions.find((mls) => mls.value === mlsSid)
  return mls?.label || mlsSid
}
