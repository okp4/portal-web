import type { SelectOption, SelectValue, UseState } from '@okp4/ui'
import React, { useCallback, useState } from 'react'
import './dataverse.scss'
import type { NextPage } from 'next'
import { DataverseFilters, DataverseList, DataverseListConfiguration, PageTitle } from '../../components'

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
    label: 'createdAt',
    value: 'createdAt'
  }
]

const Dataverse: NextPage = () => {
  const [range, setRange]: UseState<string> = useState<string>(rangeOptions[0].value)
  const [sortBy, setSortBy]: UseState<string> = useState<string>(sortOptions[0].value)

  const handleRangeChange = useCallback((value: SelectValue): void => {
    setRange(value as string)
  }, [])

  const handleSortByChange = useCallback((value: SelectValue): void => {
    setSortBy(value as string)
  }, [])

  return (
    <section className="okp4-dataverse">
      <PageTitle title="dataverse:title" />
      <DataverseListConfiguration
        onRangeChange={handleRangeChange}
        onSortByChange={handleSortByChange}
        range={range}
        rangeOptions={rangeOptions}
        sortBy={sortBy}
        sortOptions={sortOptions}
      />
      <DataverseList range={range} sortBy={sortBy} />
      <DataverseFilters />
    </section>
  )
}

export default Dataverse
