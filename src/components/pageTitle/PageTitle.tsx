import { Typography, useMediaType, useTranslation } from '@okp4/ui'
import type { UseTranslationResponse } from '@okp4/ui'
import './pageTitle.scss'

type PageTitleProps = {
  readonly title: string
}

const PageTitle = ({ title }: PageTitleProps): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()
  const isSmallScreen: boolean = useMediaType('(max-width: 995px)')

  return (
    <div className="okp4-page-title">
      <Typography as="h1" fontSize={isSmallScreen ? 'medium' : 'large'} fontWeight="bold">
        {t(title)}
      </Typography>
    </div>
  )
}

export default PageTitle