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
import type { DatasetDto } from '../../../../../../dto/DatasetDto'
import type { DataspaceDto } from '../../../../../../dto/DataspaceDto'
import type { Config } from '../../../../../api/config'
import { datasets, dataspaces } from '../../../../../api/store'

type Props = {
  dataspace: DataspaceDto | null
  dataset: DatasetDto | null
  config: Config | null
}

const DatasetId: NextPage<Props> = ({ dataspace, dataset, config }: DeepReadonly<Props>) =>
  dataset &&
  config && (
    <div className="okp4-dataset-id">
      <PageTitle title="dataset:title" />
      <PreviousPageButton />
      <DatasetPreview
        chain={config.chain}
        dataset={dataset}
        okp4BiUrl={config.app.okp4BiUrl}
        transaction={config.transaction}
      />
      <DatasetInformation dataset={dataset} dataspace={dataspace} />
    </div>
  )

export const getStaticPaths: GetStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const paths = datasets
    .toIndexedSeq()
    .toArray()
    .map((dataset: DeepReadonly<DatasetDto>) => ({
      params: { dataspaceId: dataset.dataspaceId, datasetId: dataset.id }
    }))

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async (
  context: DeepReadonly<GetStaticPropsContext>
): Promise<GetStaticPropsResult<Omit<Props, 'config'>>> => {
  const dataspaceId = context.params?.dataspaceId ?? ""
  const datasetId = context.params?.datasetId ?? ""
  const dataspace = dataspaces.get(dataspaceId.toString()) ?? null;
  const dataset = datasets.get(datasetId.toString()) ?? null;

  return {
    props: { dataspace, dataset }
  }
}

export default DatasetId
