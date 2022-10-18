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
} from '../../../../components'
import './datasetId.scss'
import type { Config } from '../../../api/config'
import { fetchConfig } from '../../../../utils'

export type DatasetGovernance = {
  readonly name: string
  readonly based: string
}

export type Dataset = {
  readonly id: string
  readonly mainPicture: string
  readonly name: string
  readonly type: string
  readonly access: string
  readonly categories: Array<string>
  readonly description: string
  readonly provider: string
  readonly governance: DatasetGovernance
  readonly size: number
  readonly format: string
  readonly quality: number
  readonly completeness: number
  readonly updatedOn: string
}

type Props = {
  dataset: Dataset | null
}

const DatasetId: NextPage<Props> = ({ dataset }: DeepReadonly<Props>) =>
  dataset && (
    <div className="okp4-dataset-id">
      <PageTitle title="dataset:title" />
      <PreviousPageButton />
      <DatasetPreview dataset={dataset} />
      <DatasetInformation dataset={dataset} />
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
  const res = await fetch(`${config.app.apiUri}/api/fake/dataset/${context.params?.datasetId}`)
  const dataset: Dataset | null = res.ok ? await res.json() : null

  return {
    props: { dataset }
  }
}

export default DatasetId
