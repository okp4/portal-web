import React from 'react'
import Head from 'next/head'
import { Footer, Header, Logo, Typography, useTheme, useTranslation } from '@okp4/ui'
import type { DeepReadonly, ThemeContextType, UseTranslationResponse } from '@okp4/ui'
import lightCosmos from '@okp4/ui/lib/assets/images/cosmos-clear.png'
import darkCosmos from '@okp4/ui/lib/assets/images/cosmos-dark.png'
import '../../i18n/index'
import "./layout.scss"

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

const Layout = ({ children }: DeepReadonly<LayoutProps>): JSX.Element => {
  const { theme }: ThemeContextType = useTheme()
  const { t }: UseTranslationResponse = useTranslation()
  const themedImage = theme === 'light' ? lightCosmos.src : darkCosmos.src
  const footerLabel = t('footer:brand-link')

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
        <Header firstElement={<Logo size="small" />} />
        <main style={{ backgroundImage: `url(${themedImage})` }}>{children}</main>
        <Footer languages={languages} lastElement={<Okp4Link label={footerLabel} />} />
      </div>
    </>
  )
}

export default Layout
