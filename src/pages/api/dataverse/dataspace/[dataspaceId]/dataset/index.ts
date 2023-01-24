import type { NextApiRequest, NextApiResponse } from 'next'
import { createDataset, getDataset, getDataspace, getDataspaceDatasets } from '../../../../store'

const getDatasets = async (
  dataspace: string,
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const datasets = await getDataspaceDatasets(dataspace)
    if (!datasets) {
      res.status(404).end()
      return
    }
    res.status(200).json(datasets.slice(0, 100).map((v: string) => JSON.parse(v)))
  } catch (err: unknown) {
    console.error(err)
    res.status(500).end()
  }
}

const postDataset = async (
  dataspace: string,
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    if (!(await getDataspace(dataspace))) {
      res.status(404).end()
      return
    }

    if (await getDataset(dataspace, req.body.id)) {
      res.status(409).end()
      return
    }

    await createDataset(dataspace, req.body)
    res.status(201).end()
  } catch (err: unknown) {
    console.error(err)
    res.status(500).end()
  }
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const dataspaceId = req.query.dataspaceId
  if (!dataspaceId || typeof dataspaceId !== 'string') {
    res.status(400).send({ message: 'Invalid query parameter: dataspaceId' })
    return
  }

  switch (req.method) {
    case 'GET':
      return getDatasets(dataspaceId, req, res)
    case 'POST':
      return postDataset(dataspaceId, req, res)
    default:
      res.status(405).end()
  }
}

export default handler
