import dynamic from 'next/dynamic'

const DataspaceOptions = dynamic(
  async () => import('./dataspaceDashboard/dataspaceOptions/DataspaceOptions'),
  {
    ssr: false
  }
)

const DataspaceSummary = dynamic(
  async () => import('./dataspaceDashboard/dataspaceSummary/DataspaceSummary'),
  {
    ssr: false
  }
)
export const Content = dynamic(async () => import('./content/Content'), {
  ssr: false
})

export const PageTitle = dynamic(async () => import('./pageTitle/PageTitle'), {
  ssr: false
})

export const PreviousPageButton = dynamic(async () => import('./previousPageButton/PreviousPageButton'), {
  ssr: false
})

export const DatasetPreview = dynamic(
  async () => import('./dataset/datasetPreview/DatasetPreview'),
  {
    ssr: false
  }
)

const DataspaceEntities = dynamic(
  async () => import('./dataspaceDashboard/dataspaceEntities/DataspaceEntities'),
  {
    ssr: false
  }
)

export const DatasetInformation = dynamic(
  async () => import('./dataset/datasetInformation/DatasetInformation'),
  {
    ssr: false
  }
)

export { DataspaceOptions, DataspaceSummary, DataspaceEntities }
