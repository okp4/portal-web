import type { NextApiRequest, NextApiResponse } from 'next'
import { getDataspaces } from '../../store'

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method !== 'GET') {
    res.status(405).end()
    return
  }

  try {
    const dataspaces = await getDataspaces()
    res.status(200).json(dataspaces.slice(0, 100).map((v: string) => JSON.parse(v)))
  } catch (err: unknown) {
    console.error(err)
    res.status(500).end()
  }
}

export default handler
