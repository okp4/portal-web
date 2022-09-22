import { Typography, useMediaType } from '@okp4/ui'
import styles from './ExploreTitle.module.scss'

type ExploreTitleProps = {
  readonly title: string
}

const ExploreTitle = ({ title }: ExploreTitleProps): JSX.Element => {
  const isSmallScreen = useMediaType('(max-width: 995px)')

  return (
    <div className={`okp4-explore-title ${styles['container']}`}>
      <Typography as="h1" fontSize={isSmallScreen ? 'medium' : 'large'} fontWeight="bold">
        {title}
      </Typography>
    </div>
  )
}

export default ExploreTitle;