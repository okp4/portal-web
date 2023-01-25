import { useEffect, useState } from 'react'
import { Card, Typography, useTheme } from '@okp4/ui'
import type { ThemeContextType, DeepReadonly, UseState } from '@okp4/ui'
import type { DatasetDto } from '../../../dto/DatasetDto'
import type { ServiceDto } from '../../../dto/ServiceDto'
import classNames from 'classnames'
import Link from 'next/link'

type DataverseEntity = DatasetDto | ServiceDto

type EntityCardProps = {
  name: string
  type: string
}

const EntityCard = ({ name, type }: DeepReadonly<EntityCardProps>): JSX.Element => (
  <Card
    footer={
      <div className="okp4-dataspace-card-footer">
        <Typography>{name}</Typography>
      </div>
    }
    header={
      <div className="okp4-dataspace-card-header">
        <Typography>{type}</Typography>
      </div>
    }
    size="small"
  />
)

const fetchEntities = async (id: string): Promise<DataverseEntity[]> => {
  return await Promise.all(
    [
      await fetch(`/api/dataverse/dataspace/${id}/dataset?final_dataset=true&size=2`).then(
        async (res: DeepReadonly<Response>) => (res.ok ? await res.json() : [])
      ),
      await fetch(`/api/dataverse/dataspace/${id}/service?size=1`).then(
        async (res: DeepReadonly<Response>) => (res.ok ? await res.json() : [])
      )
    ]
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  ).then((arrays: DataverseEntity[]) => arrays.flat())
}

const DataspaceEntities = ({ dataspaceId }: DeepReadonly<{ dataspaceId: string }>): JSX.Element => {
  const [entities, setEntities]: UseState<DataverseEntity[]> = useState<DataverseEntity[]>([])
  const { theme }: ThemeContextType = useTheme()

  useEffect(() => {
    fetchEntities(dataspaceId).then(setEntities)
  }, [dataspaceId])

  return (
    <div className={classNames('okp4-dashboard-dataspace-content', theme)}>
      {entities.map(
        ({ id, name, type }: DeepReadonly<DataverseEntity>): JSX.Element =>
          type === 'dataset' ? (
            <Link href={`/dataverse/explore/dataspace/${dataspaceId}/dataset/${id}`} key={id}>
              <EntityCard name={name} type={type} />
            </Link>
          ) : (
            <EntityCard key={id} name={name} type={type} />
          )
      )}
    </div>
  )
}

export default DataspaceEntities
