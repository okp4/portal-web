import React, { useEffect, useState } from 'react'
import type { UseState } from '@okp4/ui'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { Layout } from '../components'
import type { Config } from './api/config'
import './styles.scss'

const ThemeProvider = dynamic(async () => (await import('@okp4/ui')).ThemeProvider, {
  ssr: false
})

const fetchConfig = async (): Promise<Config> => {
  const response = await fetch('/api/config')
  return await response.json()
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const PortalWebApp = ({ Component, pageProps }: AppProps): JSX.Element | null => {
  const [config, setConfig]: UseState<Config | null> = useState<Config | null>(null)

  useEffect(() => {
    fetchConfig()
      .then(setConfig)
      .catch((error: unknown) => console.error(error))
  }, [])

  return (
    <ThemeProvider>
      <Layout config={config}>
        <Component {...pageProps} config={config} />
      </Layout>
    </ThemeProvider>
  )
}

export default PortalWebApp
