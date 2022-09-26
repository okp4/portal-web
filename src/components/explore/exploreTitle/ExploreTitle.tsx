import { Typography, useMediaType, useTranslation } from '@okp4/ui'
import type { UseTranslationResponse } from '@okp4/ui'
import styles from './ExploreTitle.module.scss'

const ExploreTitle = (): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()
  const isSmallScreen = useMediaType('(max-width: 995px)')

  return (
    <div className={`okp4-explore-title ${styles['container']}`}>
      <Typography as="h1" fontSize={isSmallScreen ? 'medium' : 'large'} fontWeight="bold">
        {t('explore:title')}
      </Typography>
    </div>
  )
}

export default ExploreTitle