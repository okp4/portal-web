import React, { useMemo } from 'react'
import Head from 'next/head'
import getConfig from 'next/config'
import { Footer, Header, Logo, Typography, Icon, useTheme, useTranslation } from '@okp4/ui'
import type { DeepReadonly, ThemeContextType, UseTranslationResponse, IconName } from '@okp4/ui'
import lightCosmos from '@okp4/ui/lib/assets/images/cosmos-clear.png'
import darkCosmos from '@okp4/ui/lib/assets/images/cosmos-dark.png'
import '../../i18n/index'
import './layout.scss'
import type { Config } from '../../pages/api/config'

// eslint-disable-next-line @typescript-eslint/typedef
const { publicRuntimeConfig } = getConfig()

type LayoutProps = {
  config: Config | null
  readonly children: React.ReactNode
}

type FooterLinkProps = {
  label: string
  url: string
}

type SocialMediaIcon = {
  icon: IconName
  url: string
}

type SocialMediaUrls = {
  discordUrl: string
  githubUrl: string
  linkedinUrl: string
  mediumUrl: string
  telegramUrl: string
  twitterUrl: string
}

type FooterSocialMedia = {
  isLightTheme: boolean
  socialMediaUrls: SocialMediaUrls
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

const Okp4Link = ({ label, url }: DeepReadonly<FooterLinkProps>): JSX.Element => (
  <Typography as="p" color="invariant-text" fontSize="x-small" fontWeight="xlight" noWrap>
    {`${label} `}
    <Typography color="invariant-text" fontSize="x-small" fontWeight="bold">
      <a className="okp4-brand-link" href={url} rel="author noreferrer" target="_blank">
        ØKP4
      </a>
      <Typography color="invariant-text" fontSize="x-small" fontWeight="xlight"> - v{publicRuntimeConfig.version}</Typography>
    </Typography>
  </Typography>
)

// eslint-disable-next-line max-lines-per-function
const Okp4SocialMedia = ({
  isLightTheme,
  socialMediaUrls
}: DeepReadonly<FooterSocialMedia>): JSX.Element => {
  const {
    discordUrl,
    githubUrl,
    linkedinUrl,
    mediumUrl,
    telegramUrl,
    twitterUrl
  }: SocialMediaUrls = socialMediaUrls
  const socialMediaIcons: SocialMediaIcon[] = useMemo(
    () => [
      {
        icon: 'github-round',
        url: githubUrl
      },
      {
        icon: 'medium-round',
        url: mediumUrl
      },
      {
        icon: 'linkedin-round',
        url: linkedinUrl
      },
      {
        icon: 'twitter-round',
        url: twitterUrl
      },
      {
        icon: 'discord-round',
        url: discordUrl
      },
      {
        icon: 'telegram-round',
        url: telegramUrl
      }
    ],
    [discordUrl, githubUrl, linkedinUrl, mediumUrl, telegramUrl, twitterUrl]
  )

  return (
    <div className="okp4-footer-last-element-social-medias">
      {socialMediaIcons.map(
        ({ icon, url }: DeepReadonly<SocialMediaIcon>): JSX.Element => (
          <a href={url} key={icon} rel="noreferrer" target="_blank">
            <Icon
              className="okp4-footer-last-element-icon"
              invertColor={isLightTheme}
              name={icon}
            />
          </a>
        )
      )}
    </div>
  )
}

const Layout = ({ config, children }: DeepReadonly<LayoutProps>): JSX.Element => {
  const { theme }: ThemeContextType = useTheme()
  const { t }: UseTranslationResponse = useTranslation()
  const isLightTheme = theme === 'light'
  const themedImage = isLightTheme ? lightCosmos.src : darkCosmos.src
  const footerLabel = t('footer:brand-link')

  return (
    <>
      <Head>
        <title>OKP4 Portal</title>
        <meta
          content="OKP4, Portal, Data App, Dataverse, Services, Dataset, Data Space, Deposit, Catalog, Files, Blockchain, Metadata, Exploration, Know, Token"
          name="keywords"
        />
        <meta content={publicRuntimeConfig.version} name="version" />
        <link href="/okp4-logo.png" rel="icon" type="image/x-icon" />
      </Head>
      <div id="layout">
        <Header firstElement={<Logo size="small" />} />
        <main style={{ backgroundImage: `url(${themedImage})` }}>{children}</main>
        <Footer
          languages={languages}
          {...(config && {
            lastElement: (
              <div className="okp4-footer-last-element">
                <Okp4SocialMedia
                  isLightTheme={isLightTheme}
                  socialMediaUrls={config.app.socialMediaUrls}
                />
                <Okp4Link label={footerLabel} url={config.app.websiteUrl} />
              </div>
            )
          })}
        />
      </div>
    </>
  )
}

export default Layout
