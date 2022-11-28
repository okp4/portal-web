import { useCallback, useEffect, useState } from 'react'
import type { GetStaticProps, GetStaticPropsResult, NextPage } from 'next'
import type { DeepReadonly, SelectValue, UseState } from '@okp4/ui'
import { DataspaceSummary, DataspaceOptions, DataspaceEntities } from '../../components/index'
import type { DataspaceDto } from '../../dto/DataspaceDto'
import { config } from '../../lib/config'
import { dataspaces as storeDataspaces } from '../api/store'

type HomePageProps = {
  readonly dataspaces: DataspaceDto[]
  readonly defaultDataspaceId: string;
}

export const HomePage: NextPage<DeepReadonly<HomePageProps>> = ({ dataspaces, defaultDataspaceId }: DeepReadonly<HomePageProps>) => {
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
    selectDataspace(defaultDataspaceId)
  }, [dataspaces, defaultDataspaceId, selectDataspace])

  return (
    dataspace && (
      <div className="okp4-body-main">
        <div className="okp4-body-dashboard">
          <DataspaceSummary
            createDataspaceUrl={config.app.createDataspaceUrl}
            dataspaces={dataspaces}
            onDataspaceChange={handleChangeSelectedDataspace}
            selectedDataspace={dataspace}
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

export const getStaticProps: GetStaticProps = (): GetStaticPropsResult<HomePageProps> => {
  return {
    props: {
      dataspaces: storeDataspaces.toIndexedSeq().toArray(),
      defaultDataspaceId: config.app.defaultDataspaceId,
    }
  }
}
