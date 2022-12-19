import type { DeepReadonly } from '@okp4/ui'
import type {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
  NextPage
} from 'next'
import { GovernanceSummary } from '../../../../../components'
import type { DataspaceDto } from '../../../../../dto/DataspaceDto'

type GovernanceProps = {
  dataspace: DataspaceDto | null
}

const Governance: NextPage<GovernanceProps> = ({ dataspace }: DeepReadonly<GovernanceProps>) => {
  return (
    <div className="okp4-governance-main">
      {dataspace && (
        <GovernanceSummary dataspaceName={dataspace.name} governance={dataspace.governance} />
      )}
    </div>
  )
}

export default Governance

export const getStaticPaths: GetStaticPaths = async (): Promise<GetStaticPathsResult> => {
  return {
    paths: [],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({
  params
}: DeepReadonly<GetStaticPropsContext>): Promise<
  GetStaticPropsResult<Omit<GovernanceProps, 'config'>>
> => {
  const dataspaceId = params?.dataspaceId

  const dataspaceResponse = await fetch(`${process.env.API_URI}/dataverse/dataspace/${dataspaceId}`)

  const dataspace: DataspaceDto | null = dataspaceResponse.ok
    ? await dataspaceResponse.json()
    : null

  return {
    props: { dataspace }
  }
}
