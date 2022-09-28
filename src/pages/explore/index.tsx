import type { SelectValue, UseState } from '@okp4/ui'
import React, { useCallback, useState } from 'react'
import './explore.scss'
import type { NextPage } from 'next'
import Head from 'next/head'
import {
  ContentWithoutSSR,
  ExploreFiltersWithoutSSR,
  ExploreListConfigurationWithoutSSR,
  ExploreListWithoutSSR,
  ExploreTitleWithoutSSR
} from './explore-no-ssr-components'
import { CExploreListConfigurationShowRange } from '../../constants/explore/CExploreListConfigurationShowRange.constant'
import { CExploreListConfigurationSortBy } from '../../constants/explore/CExploreListConfigurationSortBy.constant'

const Explore: NextPage = () => {
  const [range, setRange]: UseState<string> = useState<string>(
    CExploreListConfigurationShowRange[0].value
  )
  const [sortBy, setSortBy]: UseState<string> = useState<string>(
    CExploreListConfigurationSortBy[0].value
  )

  const handleRangeChange = useCallback((value: SelectValue) => {
    setRange(value as string)
  }, [])

  const handleSortByChange = useCallback((value: SelectValue) => {
    setSortBy(value as string)
  }, [])

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
          <ExploreListConfigurationWithoutSSR
            onRangeChange={handleRangeChange}
            onSortByChange={handleSortByChange}
            range={range}
            sortBy={sortBy}
          />
          <ExploreListWithoutSSR range={range} sortBy={sortBy} />
          <ExploreFiltersWithoutSSR />
        </section>
      </ContentWithoutSSR>
    </div>
  )
}

export default Explore
