import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'

// Components using document or window elements must disable ssr to be used on client side
// https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr
const ContentWithoutSSR = dynamic(async () => import('../components/content/Content'), {
  ssr: false
})

const Home: NextPage = () => {
  return (
    <div className="okp4-portal-main">
      <Head>
        <title>OKP4 Portal</title>
        <meta
          content="OKP4, Portal, Data App, Dataverse, Services, Dataset, Data Space, Deposit, Catalog, Files, Blockchain, Metadata, Exploration, Know, Token"
          name="keywords"
        />
        <link href="/okp4-logo.png" rel="icon" type="image/x-icon" />
      </Head>
      <ContentWithoutSSR />
    </div>
  )
}

export default Home
