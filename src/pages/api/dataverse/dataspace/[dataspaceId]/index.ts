import type { NextApiRequest, NextApiResponse } from 'next'
import { dataspaces } from '../../../init'

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  if (req.method !== 'GET') res.status(405).send('Method Not Allowed')

  const dataspaceId = req.query.dataspaceId as string
  const dataspace = dataspaces.get(dataspaceId)

  if (dataspace === undefined) {
    res.status(404).send('Not found')
  }

  res.status(200).json(dataspace)
}

export default handler
