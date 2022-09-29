import { Typography } from '@okp4/ui'
import type { DeepReadonly } from '@okp4/ui'
import type { ExploreDetailsMetadataComponent } from '../types/ExploreDetailsMetadataComponent.type'
import "../scss/exploreDetailsMetadataDefault.scss";

type ExploreDetailsMetadataDefaultProps = ExploreDetailsMetadataComponent

const ExploreDetailsMetadataDefault = ({
  className,
  value,
  color
}: DeepReadonly<ExploreDetailsMetadataDefaultProps>): JSX.Element => (
  <div className={`okp4-explore-details-metadata-default ${className}`}>
    <Typography as="span" color={color} fontSize="small">
      {value}
    </Typography>
  </div>
)

export default ExploreDetailsMetadataDefault
