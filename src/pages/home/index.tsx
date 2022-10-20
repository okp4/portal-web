import { useCallback, useEffect, useState } from 'react'
import type { SelectValue, UseState } from '@okp4/ui'
import type { Dataspace } from '../../components/dataspaceDashboard/dataspaceSummary/DataspaceSummary'
import { DataspaceSummary, DataspaceEntities, DataspaceOptions } from '../../components/index'
import './home.scss'

const fetchDataspace = async (url: string): Promise<Dataspace> => {
  const response = await fetch(url)
  const dataspace: Promise<Dataspace> = response.json()
  return dataspace
}

export const Home = (): JSX.Element | null => {
  const [dataspace, setDataspace]: UseState<Dataspace | null> = useState<Dataspace | null>(null)

  const retrieveAndSetDataspace = useCallback((value: SelectValue) => {
    fetchDataspace(`/api/fakeData/dataspaces/${value}`)
      .then(setDataspace)
      .catch((error: unknown) => console.error(error))
  }, [])

  useEffect(() => {
    retrieveAndSetDataspace('RhizomeId')
  }, [retrieveAndSetDataspace])

  return dataspace ? (
    <div className="okp4-body-main">
      <div className="okp4-body-dashboard">
        <DataspaceSummary dataspace={dataspace} onDataspaceChange={retrieveAndSetDataspace} />
        <DataspaceOptions />
        <DataspaceEntities entities={dataspace.entities} />
      </div>
      <div className="okp4-body-activity" />
    </div>
  ) : null
}

export default Home
