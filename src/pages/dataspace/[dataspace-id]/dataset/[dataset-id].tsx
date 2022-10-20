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
import type { Dataset } from '../../../../types/dataset/Dataset.type'
import router from 'next/router'
import type { ParsedUrlQuery } from 'querystring'

const fetchDataset = async (url: string): Promise<Dataset> => {
  const response = await fetch(url)

  if (response.status !== 200) {
    throw new Error(response.statusText)
  }

  const dataset: Promise<Dataset> = response.json()
  return dataset
}

const DatasetId: NextPage = () => {
  const [dataset, setDataset]: UseState<Dataset | null> = useState<Dataset | null>(null)
  const query: ParsedUrlQuery = router.query

  useEffect(() => {
    console.log('here')
    if (query['dataset-id']) {
      fetchDataset('/api/fake/dataset/ef347285-e52a-430d-9679-dcb76b962ce7')
        .then(setDataset)
        .catch((error: unknown) => console.error(error))
    }
  }, [query])

  return (
    dataset && (
      <div className="okp4-dataset-id">
        <PageTitle title="dataset:title" />
        <PreviousPageButton />
        <DatasetPreview dataset={dataset} />
        <DatasetInformation dataset={dataset} />
      </div>
    )
  )
}

export default DatasetId
