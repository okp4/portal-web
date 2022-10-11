import type { NextApiRequest, NextApiResponse } from 'next'
import type { DeepReadonly } from '@okp4/ui';
import dataspaces from "./dataspaces.json";

const RANGE_DEFAULT_VALUE = 10

const getRange = (range: string | undefined): number => {
  if (range === undefined) return RANGE_DEFAULT_VALUE

  return parseInt(range)
}

const handler = (req: DeepReadonly<NextApiRequest>, res: DeepReadonly<NextApiResponse>): void => {
  if (req.method !== 'GET') res.status(404).send('Not found')

  const range: number = getRange(req.query.range as string)

  res.status(200).json(dataspaces.slice(0, range))
}

export default handler
