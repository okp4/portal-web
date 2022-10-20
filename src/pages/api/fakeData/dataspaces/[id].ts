import type { NextApiRequest, NextApiResponse } from 'next'
import { Map } from 'immutable'

const rhizome = {
  id: 'RhizomeId',
  name: 'Rhizome',
  description:
    'Rhizome is a OKP4 operated Dataspace, currently under development on top of OKP4 technology. Rhizome demonstrates the power of data processing and data sharing, and the value that we can gain when effectively connecting different open access agricutlural data sources under different data formats. Rhizome aims to connect as much data as possible, and to deliver high value visuals and metrics about different agricultural-related fields such as Land use and territory management, crop and livestock management, and forest resources and wood industry.',
  membersNb: 289,
  datasetsNb: 376,
  servicesNb: 73,
  entities: [
    {
      id: 'id_1',
      type: 'Dataset',
      label: 'Agreste Normé'
    },
    {
      id: 'id_3',
      type: 'Dataset',
      label: 'RPG 2022'
    },
    {
      id: 'id_4',
      type: 'Service',
      label: 'Données Météo'
    }
  ]
}

const knowUniverse = {
  id: 'KnowUniverseId',
  name: 'Know Universe',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  membersNb: 1178,
  datasetsNb: 822,
  servicesNb: 674,
  entities: [
    {
      id: 'id_2',
      type: 'Dataset',
      label: 'Coins'
    },
    {
      id: 'id_3',
      type: 'Dataset',
      label: 'Validateurs'
    },
    {
      id: 'id_4',
      type: 'Service',
      label: 'Transaction'
    }
  ]
}

const dataspaces = Map({ [rhizome.id]: rhizome, [knowUniverse.id]: knowUniverse })

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  const dataspaceId = req.query.id as string
  if (dataspaceId) res.status(200).json(dataspaces.get(dataspaceId))
}

export default handler
