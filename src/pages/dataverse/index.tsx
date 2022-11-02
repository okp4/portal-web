import { useCallback, useEffect, useState } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import getConfig from 'next/config'
import type { DeepReadonly, SelectValue, UseState } from '@okp4/ui'
import { DataspaceSummary, DataspaceOptions, DataspaceEntities } from '../../components/index'
import type { DataspaceDto } from '../../dto/DataspaceDto'
import './index.scss'

// eslint-disable-next-line @typescript-eslint/typedef
const { publicRuntimeConfig } = getConfig()

type HomePageProps = {
  dataspaces: DataspaceDto[]
}

export const HomePage: NextPage<HomePageProps> = ({ dataspaces }: DeepReadonly<HomePageProps>) => {
  const [dataspace, setDataspace]: UseState<DeepReadonly<DataspaceDto> | null> =
    useState<DeepReadonly<DataspaceDto> | null>(null)

  const selectDataspace = useCallback(
    (id: string) => {
      const tmp: DeepReadonly<DataspaceDto> | undefined = dataspaces.find(
        (item: DeepReadonly<DataspaceDto>) => item.id === id
      )

      if (tmp !== undefined) setDataspace(tmp)
    },
    [dataspaces]
  )

  const handleChangeSelectedDataspace = useCallback(
    (value: SelectValue) => {
      selectDataspace(value as string)
    },
    [selectDataspace]
  )

  useEffect(() => {
    selectDataspace(publicRuntimeConfig.defaultDataspaceId)
  }, [dataspaces, selectDataspace])

  return (
    dataspace && (
      <div className="okp4-body-main">
        <div className="okp4-body-dashboard">
          <DataspaceSummary
            dataspace={dataspace}
            dataspaces={dataspaces}
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

export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
  const res = await fetch(`${process.env.API_URI}/dataverse/dataspace`)
  const dataspaces: DataspaceDto[] = res.ok ? await res.json() : []

  return {
    props: {
      dataspaces
    }
  }
}
