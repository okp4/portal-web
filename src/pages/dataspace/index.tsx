import type { SelectOption, SelectValue, UseState } from '@okp4/ui'
import React, { useCallback, useState } from 'react'
import './dataspace.scss'
import type { NextPage } from 'next'
import {
  DataspaceFilters,
  DataspaceList,
  DataspaceListConfiguration,
  PageTitle
} from '../../components'

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
    value: 'asc'
  },
  {
    label: 'created-on',
    value: 'createdOn'
  }
]

const Dataspace: NextPage = () => {
  const [range, setRange]: UseState<string> = useState<string>(rangeOptions[0].value)
  const [sortBy, setSortBy]: UseState<string> = useState<string>(sortOptions[0].value)
  const [listLayout, setListLayout]: UseState<'grid' | 'list' | undefined> = useState<
    'grid' | 'list' | undefined
  >('grid')

  const handleRangeChange = useCallback((value: SelectValue): void => {
    setRange(value as string)
  }, [])

  const handleSortByChange = useCallback((value: SelectValue): void => {
    setSortBy(value as string)
  }, [])

  const handleLayoutChange = useCallback((value: 'grid' | 'list' | undefined): void => {
    setListLayout(value)
  }, [])

  return (
    <section className="okp4-dataspace">
      <PageTitle title="dataspace:title" />
      <DataspaceListConfiguration
        onLayoutChange={handleLayoutChange}
        onRangeChange={handleRangeChange}
        onSortByChange={handleSortByChange}
        range={range}
        rangeOptions={rangeOptions}
        sortBy={sortBy}
        sortOptions={sortOptions}
      />
      <DataspaceList layout={listLayout} range={range} sortBy={sortBy} />
      <DataspaceFilters />
    </section>
  )
}

export default Dataspace
