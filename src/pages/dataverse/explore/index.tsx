import React, { useCallback, useEffect, useMemo, useState } from 'react'
import type { GetStaticProps, GetStaticPropsResult, NextPage } from 'next'
import type { DeepReadonly, SelectOption, SelectValue, UseState } from '@okp4/ui'
import './explore.scss'
import {
  ExploreFilters,
  ExploreList,
  ExploreListConfiguration,
  PageTitle
} from '../../../components'
import type { DatasetDto } from '../../../dto/DatasetDto'
import type { ServiceDto } from '../../../dto/ServiceDto'
import type { DataspaceDto } from '../../../dto/DataspaceDto'

export type ExploreListLayout = 'grid' | 'list' | undefined

export type DataverseEntity = DatasetDto | ServiceDto

type Props = {
  dataspaces: DataspaceDto[]
}

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

// eslint-disable-next-line max-lines-per-function
const fetchItems = async (
  range: number,
  sortBy: string,
  dataspacesId: DeepReadonly<string[]>
): Promise<DataverseEntity[]> => {
  const items = await Promise.all(
    dataspacesId.map(
      async (dataspaceId: DeepReadonly<string>) =>
        await Promise.all(
          ['dataset', 'service'].map(
            async (type: DeepReadonly<string>): Promise<DataverseEntity[]> =>
              await fetch(`/api/dataverse/dataspace/${dataspaceId}/${type}/`).then(
                async (res: DeepReadonly<Response>) => (res.ok ? await res.json() : [])
              )
          )
          // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
        ).then((res: DataverseEntity[][]) => res.flat())
    )
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  ).then((arrays: DataverseEntity[][]) => arrays.flat())

  switch (sortBy) {
    case 'name':
      items.sort((a: DeepReadonly<DataverseEntity>, b: DeepReadonly<DataverseEntity>) =>
        a.name.localeCompare(b.name)
      )
      break
    case 'createdOn':
      items.sort((a: DeepReadonly<DataverseEntity>, b: DeepReadonly<DataverseEntity>) =>
        b.createdOn.localeCompare(a.createdOn)
      )
      break
    default:
      break
  }

  return items.slice(0, range)
}

// eslint-disable-next-line max-lines-per-function
const Explore: NextPage<Props> = ({ dataspaces }: DeepReadonly<Props>) => {
  const [range, setRange]: UseState<string> = useState<string>(rangeOptions[0].value)
  const [sortBy, setSortBy]: UseState<string> = useState<string>(sortOptions[0].value)
  const [filters, setFilters]: UseState<string[]> = useState<string[]>(
    dataspaces.map((dataspace: DeepReadonly<DataspaceDto>) => dataspace.id).flat()
  )
  const [listLayout, setListLayout]: UseState<ExploreListLayout> =
    useState<ExploreListLayout>('grid')
  const [entities, setEntities]: UseState<DataverseEntity[]> = useState<DataverseEntity[]>([])

  const filtersOptions = useMemo(
    () =>
      dataspaces.map(
        (dataspace: DeepReadonly<DataspaceDto>): SelectOption => ({
          label: dataspace.name,
          value: dataspace.id
        })
      ),
    [dataspaces]
  )

  const handleRangeChange = useCallback((value: SelectValue): void => setRange(value as string), [])

  const handleSortByChange = useCallback(
    (value: SelectValue): void => setSortBy(value as string),
    []
  )

  const handleLayoutChange = useCallback(
    (value: ExploreListLayout): void => setListLayout(value),
    []
  )

  const handleFiltersChange = useCallback(
    (values: SelectValue): void => setFilters(values as string[]),
    []
  )

  useEffect(() => {
    fetchItems(parseInt(range), sortBy, filters)
      .then(setEntities)
      .catch(() => [])
  }, [range, sortBy, filters])

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
      <ExploreList entities={entities} layout={listLayout} />

      {filters.length > 0 && (
        <ExploreFilters
          filters={filters}
          filtersOptions={filtersOptions}
          onFiltersChange={handleFiltersChange}
        />
      )}
    </div>
  )
}

export default Explore

export const getStaticProps: GetStaticProps = async (): Promise<GetStaticPropsResult<Props>> => {
  const dataspacesResponse = await fetch(`${process.env.API_URI}/dataverse/dataspace/`)

  const dataspaces: DataspaceDto[] = dataspacesResponse.ok ? await dataspacesResponse.json() : []

  return {
    props: { dataspaces }
  }
}
