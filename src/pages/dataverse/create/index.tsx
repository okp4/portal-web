import type { DeepReadonly } from '@okp4/ui'
import type { GetStaticProps, GetStaticPropsResult, NextPage } from 'next'
import { CreateIntroduction, PreviousPageButton, WorkflowBuilder } from '../../../components'
import type { DatasetDto } from '../../../dto/DatasetDto'
import type { ServiceDto } from '../../../dto/ServiceDto'
import type { Config } from '../../api/config'

type CreateProps = DeepReadonly<{
  datasets: DatasetDto[] | null
  services: ServiceDto[] | null
  config: Config | null
}>

const Create: NextPage<CreateProps> = ({
  datasets,
  services,
  config
}: DeepReadonly<CreateProps>) => (
  <div className="okp4-create-main">
    <div className="okp4-create-page-introduction">
      <CreateIntroduction />
      <div className="okp4-create-return-button">
        <PreviousPageButton variant="round" />
      </div>
    </div>
    {datasets && services && config && (
      <WorkflowBuilder
        chain={config.chain}
        datasets={datasets}
        services={services}
        transaction={config.transaction}
      />
    )}
  </div>
)

export default Create

export const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<Omit<CreateProps, 'config'>>
> => {
  const datasets = await fetch(`${process.env.API_URI}/dataverse/dataset`)
    .then(async (resp: DeepReadonly<Response>) => resp.json())
    .then((datasets: DeepReadonly<DatasetDto[]>) =>
      datasets.filter(
        ({ id }: DeepReadonly<DatasetDto>) =>
          id === 'd23f0f6c-780d-4897-ba91-111d519b6f56' ||
          id === '6be4c7c2-c749-40dc-ac27-2653fa591356'
      )
    )
    .catch((error: unknown) => {
      console.error(error)
      return null
    })

  const services = await fetch(`${process.env.API_URI}/dataverse/service`)
    .then(async (resp: DeepReadonly<Response>) => resp.json())
    .then((service: DeepReadonly<ServiceDto[]>) =>
      service.filter(
        ({ id }: DeepReadonly<ServiceDto>) => id === '6636b94a-b2f7-4139-9227-6838de9d3ef3'
      )
    )
    .catch((error: unknown) => {
      console.error(error)
      return null
    })

  return {
    props: { datasets, services }
  }
}
