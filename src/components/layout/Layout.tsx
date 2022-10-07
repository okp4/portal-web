import { Footer, Header, Logo, Typography, useTheme, useTranslation } from '@okp4/ui'
import type {
  DeepReadonly,
  NavigationItem,
  ThemeContextType,
  UseTranslationResponse
} from '@okp4/ui'
import Head from 'next/head'
import lightCosmos from '@okp4/ui/lib/assets/images/cosmos-clear.png'
import darkCosmos from '@okp4/ui/lib/assets/images/cosmos-dark.png'
import '../../i18n/index'
import './layout.scss'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

type LayoutProps = {
  readonly children: React.ReactNode
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
const Layout = ({ children }: DeepReadonly<LayoutProps>): JSX.Element => {
  const { theme }: ThemeContextType = useTheme()
  const { t }: UseTranslationResponse = useTranslation()
  const themedImage = theme === 'light' ? lightCosmos.src : darkCosmos.src
  const footerLabel = t('footer:brand-link')
  const router = useRouter()
  console.log(router)

  const PhilosophyNavItem = (
    <Typography as="div" fontSize="small" fontWeight="light">
      <a
        href="https://ui.okp4.space/?path=/docs/philosophy--page"
        rel="noreferrer"
        style={{ wordBreak: 'normal' }}
        target="_blank"
      >
        Philosophy
      </a>
    </Typography>
  )
  const DesignSystemNavItem = (
    <Typography as="div" fontSize="small" fontWeight="light">
      <a
        href="https://ui.okp4.space/?path=/docs/welcome--page"
        rel="noreferrer"
        style={{ wordBreak: 'normal' }}
        target="_blank"
      >
        The OKP4 Design System
      </a>
    </Typography>
  )
  const StartNavItem = (
    <Typography as="div" fontSize="small" fontWeight="light">
      <a
        href="https://ui.okp4.space/?path=/docs/getting-started--page"
        rel="noreferrer"
        style={{ wordBreak: 'normal' }}
        target="_blank"
      >
        Launch project
      </a>
    </Typography>
  )
  const CreateNavItem: NavigationItem = {
    isSelectedFromStart: router.pathname === '/',
    menuItem: (
      <Typography as="div" fontSize="small" fontWeight="bold">
        <a
          href="https://xd.adobe.com/view/0994d8fe-0e3f-44e0-b8bf-3c399bf524d9-5cc7/screen/007b4c59-2299-452d-90d6-6218e46b55f9/"
          rel="noopener noreferrer"
          style={{ wordBreak: 'normal' }}
          target="_blank"
        >
          {t('header:create')}
        </a>
      </Typography>
    )
  }

  const ExploreNavItem: NavigationItem = {
    isSelectedFromStart: router.pathname === '/explore',
    menuItem: (
      <Typography as="div" fontSize="small" fontWeight="bold">
        <Link href="/explore">{t('header:explore')}</Link>
      </Typography>
    )
  }
  const InteractNavItem: NavigationItem = {
    menuItem: (
      <Typography as="div" fontSize="small" fontWeight="bold">
        {t('header:interact')}
      </Typography>
    ),
    subMenu: [DesignSystemNavItem, PhilosophyNavItem, StartNavItem]
  }

  const LearnNavItem: NavigationItem = {
    menuItem: (
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
  }

  const okp4NavItem: NavigationItem = {
    menuItem: (
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
  }

  const navMenu = [CreateNavItem, ExploreNavItem, InteractNavItem, LearnNavItem, okp4NavItem]
  const backHome = (): void => {
    router.push('/')
  }

  return (
    <>
      <Head>
        <title>OKP4 Portal</title>
        <meta
          content="OKP4, Portal, Data App, Dataverse, Services, Dataset, Data Space, Deposit, Catalog, Files, Blockchain, Metadata, Exploration, Know, Token"
          name="keywords"
        />
        <link href="/okp4-logo.png" rel="icon" type="image/x-icon" />
      </Head>
      <div id="layout">
        <Header
          firstElement={
            <div onClick={backHome} style={{ cursor: 'pointer' }}>
              <Logo size="small" />
            </div>
          }
          navigationMenu={navMenu}
        />
        <main style={{ backgroundImage: `url(${themedImage})` }}>{children}</main>
        <Footer languages={languages} lastElement={<Okp4Link label={footerLabel} />} />
      </div>
    </>
  )
}

export default Layout
