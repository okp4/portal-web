import type { NextApiRequest, NextApiResponse } from 'next'
import { services } from '../../store'

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  if (req.method !== 'GET') {
    res.status(405).send(null)
    return
  }

  res.status(200).json(services.toIndexedSeq().toArray())
}

export default handler
