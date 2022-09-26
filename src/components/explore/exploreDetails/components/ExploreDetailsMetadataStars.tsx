import { Icon } from '@okp4/ui'
import type { DeepReadonly } from '@okp4/ui'
import type { ExploreDetailsMetadataComponent } from '../types/ExploreDetailsMetadataComponent.type'

type ExploreDetailsMetadataStarsProps = ExploreDetailsMetadataComponent

const ExploreDetailsMetadataStars = ({
  className,
  value
}: DeepReadonly<ExploreDetailsMetadataStarsProps>): JSX.Element => (
  <div className={`okp4-explore-details-metadata-stars ${className}`}>
    {Array.from(Array(5).keys()).map((arrayValue: number) => {
      return (
        // NEED TO ADD THE STAR ICON IN THE LIB
        // NEED TO ADD THE COLOR EDITION IN THE LIB
        <Icon
          className={arrayValue <= value - 1 ? 'filled' : 'empty'}
          key={arrayValue}
          name="sun"
        />
      )
    })}
  </div>
)

export default ExploreDetailsMetadataStars
