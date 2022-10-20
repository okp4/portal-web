import { Card, Typography } from '@okp4/ui'
import type { DeepReadonly } from '@okp4/ui'
import './dataspaceEntities.scss'

export type DataspaceEntity = {
  id: string
  label: string
  type: string
}

const DataspaceEntities = ({
  entities
}: DeepReadonly<{ entities: DataspaceEntity[] }>): JSX.Element => (
  <div className="okp4-dashboard-dataspace-content">
    {entities.map((entity: DeepReadonly<DataspaceEntity>) => (
      <div className="okp4-dataspace-card" key={entity.id}>
        <Card
          footer={
            <div className="okp4-dataspace-card-footer">
              <Typography>{entity.label}</Typography>
            </div>
          }
          header={
            <div className="okp4-dataspace-card-header">
              <Typography>{entity.type}</Typography>
            </div>
          }
          size="small"
        />
      </div>
    ))}
  </div>
)

export default DataspaceEntities
