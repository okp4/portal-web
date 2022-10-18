import { useCallback, useEffect, useState } from 'react'
import type { DeepReadonly, SelectValue, UseState } from '@okp4/ui'
import type { NextPage } from 'next'
import type { Dataspace } from '../components/dataspaceDashboard/dataspaceSummary/DataspaceSummary'
import { DataspaceSummary, DataspaceEntities, DataspaceOptions } from '../components/index'
import './index.scss'
import type { Config } from './api/config'

type HomeProps = {
  governanceUrl: string
}

const fetchDataspace = async (url: string): Promise<Dataspace> => {
  const response = await fetch(url)
  const dataspace: Promise<Dataspace> = response.json()
  return dataspace
}

const fetchGovernanceUrl = async (): Promise<string> => {
  const response = await fetch('/api/config')
  const config: Config = await response.json()
  return config.app.governanceUrl
}

export const HomePage: NextPage<DeepReadonly<HomeProps>> = () => {
  const [dataspace, setDataspace]: UseState<Dataspace | null> = useState<Dataspace | null>(null)
  const [dataspaceGovernanceUrl, setDataspaceGovernanceUrl]: UseState<string> = useState<string>('')

  const retrieveAndSetDataspace = useCallback((value: SelectValue) => {
    fetchDataspace(`/api/fakeData/dataspaces/${value}`)
      .then(setDataspace)
      .catch((error: unknown) => console.error(error))
  }, [])

  useEffect(() => {
    retrieveAndSetDataspace('RhizomeId')
  }, [retrieveAndSetDataspace])

  useEffect(() => {
    fetchGovernanceUrl()
      .then(setDataspaceGovernanceUrl)
      .catch((error: unknown) => console.error(error))
  }, [])

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
