import { useEffect, useState } from 'react'
import { Card, Typography } from '@okp4/ui'
import type { DeepReadonly, UseState } from '@okp4/ui'
import './dataspaceEntities.scss'
import type { DatasetDto } from '../../../dto/DatasetDto'
import type { ServiceDto } from '../../../dto/ServiceDto'
import { fetchConfig } from '../../../utils'

type DataspaceEntity = DatasetDto | ServiceDto

const fetchEntities = async (id: string): Promise<DataspaceEntity[]> => {
  const config = await fetchConfig()
  const responses = [
    await fetch(`${config.app.apiUri}/dataverse/dataspace/${id}/dataset`),
    await fetch(`${config.app.apiUri}/dataverse/dataspace/${id}/service`)
  ]

  return (
    await Promise.all(
      responses.map(async (item: DeepReadonly<Response>) => (item.ok ? await item.json() : []))
    )
  ).flat()
}

const DataspaceEntities = ({ dataspaceId }: DeepReadonly<{ dataspaceId: string }>): JSX.Element => {
  const [entities, setEntities]: UseState<DataspaceEntity[]> = useState<DataspaceEntity[]>([])

  useEffect(() => {
    fetchEntities(dataspaceId).then(setEntities)
  }, [dataspaceId])

  return (
    <div className="okp4-dashboard-dataspace-content">
      {entities.map(
        (entity: DeepReadonly<DataspaceEntity>): JSX.Element => (
          <div className="okp4-dataspace-card" key={entity.id}>
            <Card
              footer={
                <div className="okp4-dataspace-card-footer">
                  <Typography>{entity.name}</Typography>
                </div>
              }
              header={
                <div className="okp4-dataspace-card-header">
                  <Typography>{entity.type}</Typography>
                </div>
              }
            />
          </div>
        )
      )}
    </div>
  )
}

export default DataspaceEntities
