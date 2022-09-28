import type { NextApiRequest, NextApiResponse } from 'next'
import type { Explore } from '../../../../types/explore/Explore.type'
import { CExplore } from './constants/CExplore.constant'
import { type DeepReadonly } from '@okp4/ui'

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  if (req.method !== 'GET') res.status(404).send("Not found")

  const id = req.query.id as string
  const item: Explore | undefined = CExplore.find((o: DeepReadonly<Explore>) => o.id === id)

  if (!id || item === undefined) {
    res.status(404).send("Not found")
  }
  res.status(200).json(item)
}

export default handler
