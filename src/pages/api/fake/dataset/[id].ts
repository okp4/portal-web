import type { NextApiRequest, NextApiResponse } from 'next'
import type { DeepReadonly } from '@okp4/ui'
import type { Dataset } from '../../../dataverse/explore/dataspace/[dataspaceId]/dataset/[datasetId]'
import untypedDatasets from './datasets.json'

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  if (req.method !== 'GET') res.status(404).send('Not found')

  const datasets: Array<Dataset> = untypedDatasets
  const id = req.query.id as string
  const dataset = datasets.find(
    (item: DeepReadonly<Dataset>) => item.id === id
  )

  if (!id || dataset === undefined) {
    res.status(404).send('Not found')
  }

  res.status(200).json(dataset as Dataset)
}

export default handler
