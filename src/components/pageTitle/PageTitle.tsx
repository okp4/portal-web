import { Typography, useBreakpoint, useTranslation } from '@okp4/ui'
import type { Breakpoints, UseTranslationResponse } from '@okp4/ui'
import './pageTitle.scss'

type PageTitleProps = {
  readonly title: string
}

const PageTitle = ({ title }: PageTitleProps): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()
  const { isXSmall, isSmall }: Breakpoints = useBreakpoint();

  return (
    <div className="okp4-page-title">
      <Typography as="h1" fontSize={isXSmall || isSmall ? 'medium' : 'large'} fontWeight="bold">
        {t(title)}
      </Typography>
    </div>
  )
}

export default PageTitle
