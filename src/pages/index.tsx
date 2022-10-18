import { useCallback, useEffect, useState } from 'react'
import type { DeepReadonly, SelectValue, UseState } from '@okp4/ui'
import type { GetStaticProps, GetStaticPropsResult, NextPage } from 'next'
import type { Dataspace } from '../components/dataspaceDashboard/dataspaceSummary/DataspaceSummary'
import { DataspaceSummary, DataspaceEntities, DataspaceOptions } from '../components/index'
import './index.scss'
import { server } from './api/config'
import type { Config } from './api/config'

type HomeProps = {
  governanceUrl: string
}

const fetchDataspace = async (url: string): Promise<Dataspace> => {
  const response = await fetch(url)
  const dataspace: Promise<Dataspace> = response.json()
  return dataspace
}

export const HomePage: NextPage<DeepReadonly<HomeProps>> = ({
  governanceUrl
}: DeepReadonly<HomeProps>) => {
  const [dataspace, setDataspace]: UseState<Dataspace | null> = useState<Dataspace | null>(null)
  const retrieveAndSetDataspace = useCallback((value: SelectValue) => {
    fetchDataspace(`/api/fakeData/dataspaces/${value}`)
      .then(setDataspace)
      .catch((error: unknown) => console.error(error))
  }, [])

  useEffect(() => {
    retrieveAndSetDataspace('RhizomeId')
  }, [retrieveAndSetDataspace])

  return (
    dataspace && (
      <div className="okp4-body-main">
        <div className="okp4-body-dashboard">
          <DataspaceSummary
            dataspace={dataspace}
            governanceUrl={governanceUrl}
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

export const getStaticProps: GetStaticProps<HomeProps> = async (): Promise<
  GetStaticPropsResult<HomeProps>
> => {
  const response = await fetch(`${server}/api/config`)
  const config: Config = await response.json()
  return {
    props: {
      governanceUrl: config.app.governanceUrl
    }
  }
}

export default HomePage
