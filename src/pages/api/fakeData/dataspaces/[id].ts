import type { NextApiRequest, NextApiResponse } from 'next'
import { Map } from 'immutable'

const rhizome = {
  id: 'RhizomeId',
  name: 'Rhizome',
  description:
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
  membersNb: 289,
  datasetsNb: 376,
  servicesNb: 73,
  entities: [
    {
      type: 'Dataset',
      label: 'Agreste Normé'
    },
    {
      type: 'Service',
      label: 'Jointure'
    },
    {
      type: 'Dataset',
      label: 'RPG 2022'
    },
    {
      type: 'Service',
      label: 'Données Météo'
    },
    {
      type: 'Service',
      label: 'Compta'
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
      type: 'Service',
      label: 'Contrôle'
    },
    {
      type: 'Dataset',
      label: 'Coins'
    },
    {
      type: 'Dataset',
      label: 'Validateurs'
    },
    {
      type: 'Service',
      label: 'Transaction'
    },
    {
      type: 'Service',
      label: 'Validation'
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
