import type { NextApiRequest, NextApiResponse } from 'next'
import type { DatasetDto } from '../../../../../../dto/DatasetDto'
import { datasets } from '../../../../init'
import type { DeepReadonly } from '@okp4/ui'

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  if (req.method !== 'GET') {
    res.status(405).send(null)
    return
  }

  const dataspaceId = req.query.dataspaceId as string
  const datasetId = req.query.datasetId as string
  const dataset = datasets
    .filter((item: DeepReadonly<DatasetDto>) => item.dataspaceId === dataspaceId)
    .get(datasetId)

  if (dataset === undefined) {
    res.status(404).send(null)
    return
  }

  res.status(200).json(dataset)
}

export default handler
