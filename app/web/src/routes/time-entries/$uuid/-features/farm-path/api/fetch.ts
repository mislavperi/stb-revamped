import { client } from '@/api/client'
import { GetFarmPathByUUIDResponse } from '@/api/types/farmPath'

const getPathPathByUUID = async (uuid: string) => {
  const result = await client.get<GetFarmPathByUUIDResponse>('/farm/' + uuid)

  return result.data
}

export const getQueryOptions = (farmPathUUID: string) => {
  return {
    queryKey: ['farm-path', farmPathUUID],
    queryFn: () => getPathPathByUUID(farmPathUUID),
  }
}
