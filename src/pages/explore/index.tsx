import React from 'react'
import "./explore.scss";
import type { NextPage } from 'next'
import Head from 'next/head'
import {
  ContentWithoutSSR,
  ExploreFiltersWithoutSSR,
  ExploreListConfigurationWithoutSSR,
  ExploreListWithoutSSR,
  ExploreTitleWithoutSSR
} from './explore-no-ssr-components'

const Explore: NextPage = () => {
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
      <ContentWithoutSSR>
        <section className="okp4-explore-main">
          <ExploreTitleWithoutSSR />
          <ExploreListConfigurationWithoutSSR />
          <ExploreListWithoutSSR />
          <ExploreFiltersWithoutSSR />
        </section>
      </ContentWithoutSSR>
    </div>
  )
}

export default Explore
