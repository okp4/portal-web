import type { NextApiRequest, NextApiResponse } from 'next'
import { Map } from 'immutable'

const rhizome = {
  id: 'RhizomeId',
  name: 'Rhizome',
  description:
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
  members: 289,
  datasets: 376,
  services: 73,
  data: [
    {
      type: 'Dataset',
      title: 'Agreste Normé'
    },
    {
      type: 'Service',
      title: 'Jointure'
    },
    {
      type: 'Dataset',
      title: 'RPG 2022'
    },
    {
      type: 'Service',
      title: 'Données Météo'
    },
    {
      type: 'Service',
      title: 'Compta'
    }
  ]
}

const knowUniverse = {
  id: 'KnowUniverseId',
  name: 'Know Universe',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  members: 1178,
  datasets: 822,
  services: 674,
  data: [
    {
      type: 'Dataset',
      title: 'Coins'
    },
    {
      type: 'Service',
      title: 'Transaction'
    },
    {
      type: 'Dataset',
      title: 'Validateurs'
    },
    {
      type: 'Service',
      title: 'Validation'
    },
    {
      type: 'Service',
      title: 'Contrôle'
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
