import { useCallback, useEffect, useState } from 'react'
import type { SelectValue, UseState } from '@okp4/ui'
import type { NextPage } from 'next'
import type { Dataspace } from '../components/dataspaceDashboard/dataspaceSummary/DataspaceSummary'
import { DataspaceSummary, DataspaceEntities, DataspaceOptions } from '../components/index'
import './index.scss'
import type { Config } from './api/config'

const fetchDataspace = async (url: string): Promise<Dataspace> => {
  const response = await fetch(url)
  const dataspace: Dataspace = await response.json()
  return dataspace
}

const fetchGovernanceUrl = async (): Promise<string | null> => {
  const response = await fetch('/api/config')
  const config: Config = await response.json()
  return config.app.governanceUrl
}

export const HomePage: NextPage = () => {
  const [dataspace, setDataspace]: UseState<Dataspace | null> = useState<Dataspace | null>(null)
  const [dataspaceGovernanceUrl, setDataspaceGovernanceUrl]: UseState<string | null> = useState<
    string | null
  >(null)

  const retrieveAndSetDataspace = useCallback((value: SelectValue) => {
    fetchDataspace(`/api/fakeData/dataspaces/${value}`)
      .then(setDataspace)
      .catch((error: unknown) => console.error(error))
  }, [])

  const retrieveAndSetGovernance = useCallback(() => {
    fetchGovernanceUrl()
      .then(setDataspaceGovernanceUrl)
      .catch((error: unknown) => console.error(error))
  }, [])

  useEffect(() => {
    retrieveAndSetDataspace('RhizomeId')
  }, [retrieveAndSetDataspace])

  useEffect(() => {
    retrieveAndSetGovernance()
  }, [retrieveAndSetGovernance])

  return (
    dataspace && (
      <div className="okp4-body-main">
        <div className="okp4-body-dashboard">
          <DataspaceSummary
            dataspace={dataspace}
            governanceUrl={dataspaceGovernanceUrl}
            onDataspaceChange={retrieveAndSetDataspace}
          />
          <DataspaceEntities entities={dataspace.entities} />
          <DataspaceOptions />
        </div>
        <div className="okp4-body-activity" />
      </div>
    )
  )
}

export default HomePage
