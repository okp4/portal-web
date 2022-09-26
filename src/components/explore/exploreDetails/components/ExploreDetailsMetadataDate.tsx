import { Typography } from '@okp4/ui'
import type { DeepReadonly } from '@okp4/ui'
import { format } from 'date-fns'
import type { ExploreDetailsMetadataComponent } from '../types/ExploreDetailsMetadataComponent.type'

type ExploreDetailsMetadataDateProps = ExploreDetailsMetadataComponent

const ExploreDetailsMetadataDate = ({
  className,
  value,
  isEven
}: DeepReadonly<ExploreDetailsMetadataDateProps>): JSX.Element => (
  <div className={`okp4-explore-details-metadata-date ${className}`}>
    <Typography as="span" color={isEven ? 'invariant-text' : 'inverted-text'} fontSize="small">
      {format(new Date(value), 'dd/MM/yyyy')}
    </Typography>
  </div>
)

export default ExploreDetailsMetadataDate
