import type { NextApiRequest, NextApiResponse } from 'next'
import { Map } from 'immutable'
import { useTranslation } from '@okp4/ui'
import type { UseTranslationResponse } from '@okp4/ui'

type DataSpace = {
  id: string
  name: string
  description: string
  membersNb: number
  datasetsNb: number
  servicesNb: number
  entities: {
    id: string
    type: string
    label: string
  }[]
  governance: string
}

// eslint-disable-next-line max-lines-per-function
const DataSpaces = (): Map<string, DataSpace> => {
  const { t }: UseTranslationResponse = useTranslation()

  const rhizome = {
    id: 'RhizomeId',
    name: 'Rhizome',
    description: t('datasets:rhizome:description'),
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
        id: 'id_2',
        type: 'Service',
        label: 'Jointure'
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
      },
      {
        id: 'id_5',
        type: 'Service',
        label: 'Compta'
      }
    ],
    governance: process.env.GOVERNANCE_URL
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
        id: 'id_1',
        type: 'Service',
        label: 'Contrôle'
      },
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
      },
      {
        id: 'id_5',
        type: 'Service',
        label: 'Validation'
      }
    ],
    governance: process.env.GOVERNANCE_URL
  }

  return Map({ [rhizome.id]: rhizome, [knowUniverse.id]: knowUniverse })
}

/* const rhizome = {
  id: 'RhizomeId',
  name: 'Rhizome',
  description: 's',
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
      id: 'id_2',
      type: 'Service',
      label: 'Jointure'
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
    },
    {
      id: 'id_5',
      type: 'Service',
      label: 'Compta'
    }
  ],
  governance: process.env.GOVERNANCE_URL
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
      id: 'id_1',
      type: 'Service',
      label: 'Contrôle'
    },
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
    },
    {
      id: 'id_5',
      type: 'Service',
      label: 'Validation'
    }
  ],
  governance: process.env.GOVERNANCE_URL
}

const dataspaces = Map({ [rhizome.id]: rhizome, [knowUniverse.id]: knowUniverse }) 

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  const dataspaceId = req.query.id as string
  if (dataspaceId) res.status(200).json(dataspaces.get(dataspaceId))
}
*/

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  const dataspaceId = req.query.id as string
  if (dataspaceId) res.status(200).json(DataSpaces().get(dataspaceId))
}

export default handler
