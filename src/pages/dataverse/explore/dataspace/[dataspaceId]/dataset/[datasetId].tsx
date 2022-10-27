import type { DeepReadonly } from '@okp4/ui'
import type {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
  NextPage
} from 'next'
import {
  DatasetPreview,
  DatasetInformation,
  PageTitle,
  PreviousPageButton
} from '../../../../../../components'
import './datasetId.scss'
import type { Config } from '../../../../../api/config'
import { fetchConfig } from '../../../../../../utils'
import type { DatasetDto } from '../../../../../../dto/DatasetDto'
import type { DataspaceDto } from '../../../../../../dto/DataspaceDto'

type Props = {
  dataspace: DataspaceDto | null
  dataset: DatasetDto | null
}

const DatasetId: NextPage<Props> = ({ dataspace, dataset }: DeepReadonly<Props>) =>
  dataset && (
    <div className="okp4-dataset-id">
      <PageTitle title="dataset:title" />
      <PreviousPageButton />
      <DatasetPreview dataset={dataset} />
      <DatasetInformation dataset={dataset} dataspace={dataspace} />
    </div>
  )

export const getStaticPaths: GetStaticPaths = async (): Promise<GetStaticPathsResult> => {
  return {
    paths: [],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async (
  context: DeepReadonly<GetStaticPropsContext>
): Promise<GetStaticPropsResult<Props>> => {
  const config: Config = await fetchConfig()
  const dataspaceId = context.params?.dataspaceId
  const datasetId = context.params?.datasetId

  const dataspaceResponse = await fetch(`${config.app.apiUri}/dataverse/dataspace/${dataspaceId}`)
  const datasetResponse = await fetch(
    `${config.app.apiUri}/dataverse/dataspace/${dataspaceId}/dataset/${datasetId}`
  )

  const dataspace: DataspaceDto | null = dataspaceResponse.ok
    ? await dataspaceResponse.json()
    : null
  const dataset: DatasetDto | null = datasetResponse.ok ? await datasetResponse.json() : null

  return {
    props: { dataspace, dataset }
  }
}

export default DatasetId
