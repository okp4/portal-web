import type { NextApiRequest, NextApiResponse } from 'next'
import type { DatasetDto } from '../../../../../../dto/DatasetDto'
import { datasets } from '../../../../store'
import type { Map } from 'immutable'
import type { DeepReadonly } from '@okp4/ui'

const ITEMS_PER_PAGE = 10

const fetchFinalDatasets = (
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  data: Map<string, DatasetDto>,
  dataspaceId: string,
  count: number
): Map<string, DatasetDto> => {
  return data
    .filter(
      (item: DeepReadonly<DatasetDto>) =>
        item.dataspaceId === dataspaceId && item.final_dataset === true
    )
    .slice(0, count)
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  if (req.method !== 'GET') {
    res.status(405).send(null)
    return
  }

  const dataspaceId = req.query.dataspaceId as string
  const size = req.query.size as string
  // eslint-disable-next-line functional/no-let
  let data: Map<string, DatasetDto>;

  if (req.query.final_dataset === 'true') {
    data = fetchFinalDatasets(datasets, dataspaceId, size !== '' ? parseInt(size) : ITEMS_PER_PAGE)
  } else {
    data = datasets.filter((item: DeepReadonly<DatasetDto>) => item.dataspaceId === dataspaceId)
  }

  if (data.size === 0) {
    res.status(404).send(null)
    return
  }

  res.status(200).json(data.toIndexedSeq().toArray())
}

export default handler
