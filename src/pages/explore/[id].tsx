import React from 'react'
import type { NextPage } from 'next'
import {
  ExploreCardWithoutSSR,
  ExploreDetailsWithoutSSR,
  ExploreTitleWithoutSSR,
  GoBackWithoutSSR
} from './explore-id-no-ssr-components'
import './ExploreId.scss'

const ExploreId: NextPage = () => {
  return (
    <div className="okp4-explore-id">
      <ExploreTitleWithoutSSR />
      <GoBackWithoutSSR />
      <ExploreCardWithoutSSR />
      <ExploreDetailsWithoutSSR />
    </div>
  )
}

export default ExploreId
