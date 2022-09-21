import type { DeepReadonly } from '@okp4/ui'
import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

type LayoutProps = {
  readonly children?: JSX.Element
}

// Components using document or window elements must disable ssr to be used on client side
// https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr
const ContentWithoutSSR = dynamic(async () => import('../content/Content'), {
  ssr: false
})
export const Layout = ({ children }: DeepReadonly<LayoutProps>): JSX.Element => {
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
      <main className="okp4-portal-layout">
        <ContentWithoutSSR>{children}</ContentWithoutSSR>
      </main>
    </>
  )
}
