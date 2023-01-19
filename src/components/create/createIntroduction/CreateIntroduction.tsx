import { Typography, useBreakpoint, useTranslation } from '@okp4/ui'
import type { Breakpoints, UseTranslationResponse } from '@okp4/ui'

const CreateIntroduction = (): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()
  const { isXSmall, isSmall }: Breakpoints = useBreakpoint()

  return (
    <div className="okp4-create-introduction-main">
      <Typography as="h1" fontSize={isXSmall || isSmall ? 'medium' : 'large'} fontWeight="bold">
        {t('create:title')}
      </Typography>
      <div className="okp4-create-introduction-description">
        <Typography fontSize="small">{t('create:description')}</Typography>
      </div>
    </div>
  )
}

export default CreateIntroduction
