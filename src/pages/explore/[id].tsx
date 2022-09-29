import type { UseState } from '@okp4/ui'
import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import {
  ExploreCardWithoutSSR,
  ExploreDetailsWithoutSSR,
  ExploreTitleWithoutSSR,
  GoBackWithoutSSR
} from '../../components/componentsWithoutSSR/componentsWithoutSSR'
import './exploreId.scss'
import type { Explore } from '../../types/explore/Explore.type'

const fetchExplore = async (url: string): Promise<Explore> => {
  const response = await fetch(url)

  if (response.status !== 200) {
    throw new Error(response.statusText)
  }

  return await response.json()
}

const ExploreId: NextPage = () => {
  const [explore, setExplore]: UseState<Explore | null> = useState<Explore | null>(null)

  useEffect(() => {
    fetchExplore(`/api/fake/explores/${'ef347285-e52a-430d-9679-dcb76b962ce7'}`)
      .then(setExplore)
      .catch((error: unknown) => console.error(error))
  }, [])

  if (explore === null) {
    return <div className="okp4-explore-id" />
  }

  return (
    <div className="okp4-explore-id">
      <ExploreTitleWithoutSSR />
      <GoBackWithoutSSR />
      <ExploreCardWithoutSSR explore={explore} />
      <ExploreDetailsWithoutSSR explore={explore} />
    </div>
  )
}

export default ExploreId
