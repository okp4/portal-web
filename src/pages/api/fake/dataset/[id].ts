import type { NextApiRequest, NextApiResponse } from 'next'
import type { Dataset } from '../../../../types/dataset/Dataset.type'
import datasets from './datasets.json'

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  if (req.method !== 'GET') res.status(404).send('Not found')

  const id = req.query.id as string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dataset: unknown | undefined = datasets.find((item: any) => item.id === id)

  if (!id || dataset === undefined) {
    res.status(404).send('Not found')
  }

  res.status(200).json(dataset as Dataset)
}

export default handler
