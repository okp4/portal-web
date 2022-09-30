import type { NextApiRequest, NextApiResponse } from 'next'
import type { Dataverse } from '../../../../types/dataverse/Dataverse.type'
import dataverses from './dataverses.json'

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  if (req.method !== 'GET') res.status(404).send('Not found')

  const id = req.query.id as string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dataverse: unknown | undefined = dataverses.find((item: any) => item.id === id)

  if (!id || dataverse === undefined) {
    res.status(404).send('Not found')
  }

  res.status(200).json(dataverse as Dataverse)
}

export default handler
