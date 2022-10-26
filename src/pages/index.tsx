import { useCallback, useEffect, useState } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import type { DeepReadonly, SelectValue, UseState } from '@okp4/ui'
import { DataspaceSummary, DataspaceOptions, DataspaceEntities } from '../components/index'
import './index.scss'
import { fetchConfig } from '../utils'
import type { DataspaceDto } from '../dto/DataspaceDto'

type HomePageProps = {
  dataspaces: DataspaceDto[]
}

// eslint-disable-next-line max-lines-per-function
export const HomePage: NextPage<HomePageProps> = ({ dataspaces }: DeepReadonly<HomePageProps>) => {
  const [dataspace, setDataspace]: UseState<DeepReadonly<DataspaceDto> | null> =
    useState<DeepReadonly<DataspaceDto> | null>(null)

  const selectDataspace = useCallback((id: string) => {
    const tmp: DeepReadonly<DataspaceDto> | undefined = dataspaces.find(
      (item: DeepReadonly<DataspaceDto>) => item.id === id
    )

    if (tmp !== undefined) setDataspace(tmp)
  }, [dataspaces])

  const handleChangeSelectedDataspace = useCallback((value: SelectValue) => {
    selectDataspace(value as string)
  }, [selectDataspace])

  useEffect(() => {
    selectDataspace(process.env.NEXT_PUBLIC_DEFAULT_DATASPACE_ID)
  }, [dataspaces, selectDataspace])

  return (
    dataspace && (
      <div className="okp4-body-main">
        <div className="okp4-body-dashboard">
          <DataspaceSummary
            dataspace={dataspace}
            dataspaces={dataspaces}
            governanceUrl={process.env.NEXT_PUBLIC_GOVERNANCE_URL}
            onDataspaceChange={handleChangeSelectedDataspace}
          />
          <DataspaceEntities dataspaceId={dataspace.id} />
          <DataspaceOptions />
        </div>
        <div className="okp4-body-activity" />
      </div>
    )
  )
}

export default HomePage

export const getServerSideProps: GetServerSideProps = async () => {
  const config = await fetchConfig()
  const res = await fetch(`${config.app.apiUri}/dataverse/dataspace`)
  const dataspaces: DataspaceDto[] = await res.json()

  return {
    props: {
      dataspaces
    }
  }
}
