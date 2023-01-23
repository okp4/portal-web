import type { NextApiRequest, NextApiResponse } from 'next'
import { getDataspaceServices, } from '../../../../store'

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method !== 'GET') {
    res.status(405).end()
    return
  }

  const dataspaceId = req.query.dataspaceId as string
  try {
    const services = await getDataspaceServices(dataspaceId)
    if (!services) {
      res.status(404).end()
      return
    }
    res.status(200).json(services.slice(0, 100).map((v: string) => JSON.parse(v)))
  }catch (err: unknown) {
    console.error(err)
    res.status(500).end()
  }
}

export default handler
