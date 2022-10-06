import { Footer, Header, Typography, useTheme, useTranslation, Logo } from '@okp4/ui'
import type { DeepReadonly, ThemeContextType, UseTranslationResponse } from '@okp4/ui'
import lightCosmos from '@okp4/ui/lib/assets/images/cosmos-clear.png'
import darkCosmos from '@okp4/ui/lib/assets/images/cosmos-dark.png'
import '../../i18n/index'
import './content.scss'
import React from 'react'

type ContentProps = {
  readonly children: React.ReactNode
}

type ContentProps = {
  readonly children: JSX.Element
}

type FooterLinkProps = {
  readonly label: string
}

const languages = [
  {
    name: 'English',
    lng: 'en'
  },
  {
    name: 'Français',
    lng: 'fr'
  }
]

const Okp4Link = ({ label }: FooterLinkProps): JSX.Element => {
  return (
    <Typography as="p" color="invariant-text" fontSize="x-small" fontWeight="xlight" noWrap>
      {`${label} `}
      <Typography color="invariant-text" fontSize="x-small" fontWeight="bold">
        <a
          className="okp4-brand-link"
          href="https://okp4.network/"
          rel="author noreferrer"
          target="_blank"
        >
          ØKP4
        </a>
      </Typography>
    </Typography>
  )
}

// eslint-disable-next-line max-lines-per-function
export const Content = ({ children }: DeepReadonly<ContentProps>): JSX.Element => {
  const { theme }: ThemeContextType = useTheme()
  const { t }: UseTranslationResponse = useTranslation()
  const themedImage = theme === 'light' ? lightCosmos.src : darkCosmos.src
  const footerLabel = t('footer:brand-link')
  const CreateSystemNavItem = (
    <Typography as="div" fontSize="small" fontWeight="bold">
      <a
        href="https://ui.okp4.space/?path=/docs/welcome--page"
        rel="noopener noreferrer"
        style={{ wordBreak: 'normal' }}
        target="_blank"
      >
        {t('header:create')}
      </a>
    </Typography>
  )

  const ExploreNavItem = (
    <Typography as="div" fontSize="small" fontWeight="bold">
      <a
        href="https://ui.okp4.space/?path=/docs/getting-started--page"
        rel="noopener noreferrer"
        style={{ wordBreak: 'normal' }}
        target="_blank"
      >
        {t('header:explore')}
      </a>
    </Typography>
  )
  const InteractNavItem = (
    <Typography as="div" fontSize="small" fontWeight="bold">
      {t('header:interact')}
    </Typography>
  )

  const LearnNavItem = (
    <Typography as="div" fontSize="small" fontWeight="bold">
      <a
        href="https://docs.okp4.network/docs/whitepaper/abstract"
        rel="noopener noreferrer"
        style={{ wordBreak: 'normal' }}
        target="_blank"
      >
        {t('header:learn')}
      </a>
    </Typography>
  )

  const okp4NavItem = (
    <Typography as="div" fontSize="small" fontWeight="bold">
      <a
        href="https://okp4.network/#protocol"
        rel="noopener noreferrer"
        style={{ wordBreak: 'normal' }}
        target="_blank"
      >
        {t('header:okp4')}
      </a>
    </Typography>
  )

  const navMenu = [CreateSystemNavItem, ExploreNavItem, InteractNavItem, LearnNavItem, okp4NavItem]

  return (
    <div className="okp4-portal-content" style={{ backgroundImage: `url(${themedImage})` }}>
      <Header firstElement={<Logo size="small" />} navigationMenu={navMenu} />
      {children}
      <Footer languages={languages} lastElement={<Okp4Link label={footerLabel} />} />
    </div>
  )
}

export default Content
