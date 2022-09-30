import type { UseState } from '@okp4/ui'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import {
  DataversePreview,
  DataverseInformation,
  PageTitle,
  GoToPreviousPage
} from '../../components'
import './dataverseId.scss'
import type { Dataverse } from '../../types/dataverse/Dataverse.type'

const fetchDataverse = async (url: string): Promise<Dataverse> => {
  const response = await fetch(url)

  if (response.status !== 200) {
    throw new Error(response.statusText)
  }

  const dataverse: Promise<Dataverse>= response.json()
  return dataverse
}

const DataverseId: NextPage = () => {
  const [dataverse, setDataverse]: UseState<Dataverse | null> = useState<Dataverse | null>(null)

  useEffect(() => {
    fetchDataverse(`/api/fake/dataverses/${'ef347285-e52a-430d-9679-dcb76b962ce7'}`)
      .then(setDataverse)
      .catch((error: unknown) => console.error(error))
  }, [])

  return dataverse ? (
    <div className="okp4-dataverse-id">
      <PageTitle title="dataverse:title" />
      <GoToPreviousPage />
      <DataversePreview dataverse={dataverse} />
      <DataverseInformation dataverse={dataverse} />
    </div>
  ) : null
}

export default DataverseId
