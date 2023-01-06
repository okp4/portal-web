import type { NextApiRequest, NextApiResponse } from 'next'
import type { ServiceDto } from '../../../../../../dto/ServiceDto'
import { services } from '../../../../store'
import type { DeepReadonly } from '@okp4/ui'
import { getParsedParameter } from '../../../../../../utils'

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  if (req.method !== 'GET') {
    res.status(405).send(null)
    return
  }

  const size = getParsedParameter(req.query.size, 10)

  if (size instanceof Error) {
    res.status(400).send(null)
    return
  }

  const dataspaceId = req.query.dataspaceId as string
  const data = services.filter((item: DeepReadonly<ServiceDto>) => item.dataspaceId === dataspaceId)

  if (data.size === 0) {
    res.status(404).send(null)
    return
  }

  res.status(200).json(data.slice(0, Math.min(size, 100)).toIndexedSeq().toArray())
}

export default handler
