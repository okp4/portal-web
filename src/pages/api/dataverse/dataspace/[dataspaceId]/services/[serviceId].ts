import type { NextApiRequest, NextApiResponse } from 'next'
import {type ServiceDto } from '../../../../../../dto/ServiceDto'
import { services } from '../../../../init'
import type { DeepReadonly } from '@okp4/ui'

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  if (req.method !== 'GET') {
    res.status(405).send(null)
    return
  }

  const dataspaceId = req.query.dataspaceId as string
  const serviceId = req.query.serviceId as string
  const service = services
    .filter((item: DeepReadonly<ServiceDto>) => item.dataspaceId === dataspaceId)
    .get(serviceId)

  if (service === undefined) {
    res.status(404).send(null)
    return
  }

  res.status(200).json(service)
}

export default handler
