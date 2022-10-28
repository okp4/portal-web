import React, { useCallback, useState } from 'react'
import type { NextPage } from 'next'
import type { SelectOption, SelectValue, UseState } from '@okp4/ui'
import './explore.scss'
import { ExploreFilters, ExploreList, ExploreListConfiguration, PageTitle } from '../../../components'

export type ExploreListLayout = 'grid' | 'list' | undefined

const rangeOptions: Array<SelectOption> = [
  {
    label: '10',
    value: '10'
  },
  {
    label: '25',
    value: '25'
  },
  {
    label: '50',
    value: '50'
  },
  {
    label: '100',
    value: '100'
  }
]
const sortOptions: Array<SelectOption> = [
  {
    label: 'alphabetical',
    value: 'name'
  },
  {
    label: 'created-on',
    value: 'createdOn'
  }
]

const Explore: NextPage = () => {
  const [range, setRange]: UseState<string> = useState<string>(rangeOptions[0].value)
  const [sortBy, setSortBy]: UseState<string> = useState<string>(sortOptions[0].value)
  const [listLayout, setListLayout]: UseState<ExploreListLayout> =
    useState<ExploreListLayout>('grid')

  const handleRangeChange = useCallback((value: SelectValue): void => {
    setRange(value as string)
  }, [])

  const handleSortByChange = useCallback((value: SelectValue): void => {
    setSortBy(value as string)
  }, [])

  const handleLayoutChange = useCallback((value: ExploreListLayout): void => {
    setListLayout(value)
  }, [])

  return (
    <div className="okp4-explore">
      <PageTitle title="explore:title" />
      <ExploreListConfiguration
        onLayoutChange={handleLayoutChange}
        onRangeChange={handleRangeChange}
        onSortByChange={handleSortByChange}
        range={range}
        rangeOptions={rangeOptions}
        sortBy={sortBy}
        sortOptions={sortOptions}
      />
      <ExploreList layout={listLayout} range={parseInt(range)} sortBy={sortBy} />
      <ExploreFilters />
    </div>
  )
}

export default Explore