import { useCallback, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import type { DeepReadonly, SelectValue, UseState } from '@okp4/ui'
import { DataspaceSummary, DataspaceOptions, DataspaceEntities } from '../../components/index'
import type { DataspaceDto } from '../../dto/DataspaceDto'
import type { Config } from '../api/config'

type HomePageProps = {
  config: Config | null
}

// eslint-disable-next-line max-lines-per-function
export const HomePage: NextPage<HomePageProps> = ({ config }: DeepReadonly<HomePageProps>) => {
  const [dataspaces, setDataspaces]: UseState<DeepReadonly<DataspaceDto[]>> = useState<
    DeepReadonly<DataspaceDto[]>
  >([])
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
    if (config) {
      fetch(`${config.app.apiUri}/dataverse/dataspace`)
        // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
        .then(async (resp: Response) => {
          return resp.json()
        })
        .then(setDataspaces)
        .catch((error: unknown) => console.error(error))
    }
  }, [config, config?.app.apiUri])

  useEffect(() => {
    if (config) {
      selectDataspace(config.app.defaultDataspaceId)
    }
  }, [dataspaces, config?.app.defaultDataspaceId, selectDataspace, config])

  return (
    dataspace && (
      <div className="okp4-body-main">
        <div className="okp4-body-dashboard">
          <DataspaceSummary
            createDataspaceUrl={config?.app.createDataspaceUrl}
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
