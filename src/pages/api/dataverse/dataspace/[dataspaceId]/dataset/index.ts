import type { NextApiRequest, NextApiResponse } from 'next'
import type { DatasetDto } from '../../../../../../dto/DatasetDto'
import { datasets } from '../../../../init'
import type { DeepReadonly } from '@okp4/ui'

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  if (req.method !== 'GET') res.status(405).send('Method Not Allowed')

  const dataspaceId = req.query.dataspaceId as string
  const data = datasets.filter((item: DeepReadonly<DatasetDto>) => item.dataspaceId === dataspaceId)

  if (data.size === 0) {
    res.status(404).send("Not found")
  }

  res.status(200).json(data.toIndexedSeq().toArray())
}

export default handler
