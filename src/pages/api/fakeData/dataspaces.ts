import type { NextApiRequest, NextApiResponse } from 'next'

const dataspacesList = [
  {
    label: 'Rhizome',
    value: 'RhizomeId'
  },
  {
    label: 'Know Universe',
    value: 'KnowUniverseId'
  }
]

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const handler = (_req: NextApiRequest, res: NextApiResponse): void => {
  return res.status(200).json(dataspacesList)
}

export default handler
