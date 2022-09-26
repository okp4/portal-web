import { Typography } from '@okp4/ui'
import type { DeepReadonly } from '@okp4/ui'
import type { ExploreDetailsMetadataComponent } from '../types/ExploreDetailsMetadataComponent.type'
import "../scss/ExploreDetailsMetadataDefault.scss";

type ExploreDetailsMetadataDefaultProps = ExploreDetailsMetadataComponent

const ExploreDetailsMetadataDefault = ({
  className,
  value,
  isEven
}: DeepReadonly<ExploreDetailsMetadataDefaultProps>): JSX.Element => (
  <div className={`okp4-explore-details-metadata-default ${className}`}>
    <Typography as="span" color={isEven ? 'invariant-text' : 'inverted-text'} fontSize="small">
      {value}
    </Typography>
  </div>
)

export default ExploreDetailsMetadataDefault
