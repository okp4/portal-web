import type { UseState } from '@okp4/ui'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import {
  DatasetPreview,
  DatasetInformation,
  PageTitle,
  PreviousPageButton
} from '../../../../components'
import './datasetId.scss'
import router from 'next/router'
import type { ParsedUrlQuery } from 'querystring'

export type DatasetGovernance = {
  readonly name: string
  readonly based: string
}

type Access = 'PRIVATE' | 'PUBLIC'

export type Dataset = {
  readonly id: string
  readonly mainPicture: string
  readonly name: string
  readonly type: string
  readonly access: Access
  readonly categories: Array<string>
  readonly description: string
  readonly provider: string
  readonly governance: DatasetGovernance
  readonly size: number
  readonly format: string
  readonly quality: number
  readonly completeness: number
  readonly updatedOn: string
}

const fetchDataset = async (url: string): Promise<Dataset> => {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const dataset: Promise<Dataset> = await response.json()
  return dataset
}

const DatasetId: NextPage = () => {
  const [dataset, setDataset]: UseState<Dataset | null> = useState<Dataset | null>(null)
  const query: ParsedUrlQuery = router.query

  useEffect(() => {
    if (query.datasetId) {
      fetchDataset('/api/fake/dataset/ef347285-e52a-430d-9679-dcb76b962ce7')
        .then(setDataset)
        .catch((error: unknown) => console.error(error))
    }
  }, [query])

  return dataset ? (
    <div className="okp4-dataset-id">
      <PageTitle title="dataset:title" />
      <PreviousPageButton />
      <DatasetPreview dataset={dataset} />
      <DatasetInformation dataset={dataset} />
    </div>
  ) : null
}

export default DatasetId
