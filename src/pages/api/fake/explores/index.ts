import type { NextApiRequest, NextApiResponse } from 'next'
import { CExplore } from './constants/CExplore.constant'

const RANGE_DEFAULT_VALUE = 10

const getRange = (range: string | undefined): number => {
  if (range === undefined) return RANGE_DEFAULT_VALUE

  return parseInt(range)
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  if (req.method !== 'GET') res.status(404).send('Not found')

  const range: number = getRange(req.query.range as string)

  res.status(200).json(CExplore.slice(0, range))
}

export default handler
