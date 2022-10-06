import dynamic from 'next/dynamic'

export const DataspaceOptions = dynamic(
  async () => import('./dataspaceDashboard/dataspaceOptions/DataspaceOptions'),
  {
    ssr: false
  }
)
export const DataspaceSummary = dynamic(
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

export const PreviousPageButton = dynamic(
  async () => import('./previousPageButton/PreviousPageButton'),
  {
    ssr: false
  }
)

export const DatasetPreview = dynamic(
  async () => import('./dataset/datasetPreview/DatasetPreview'),
  {
    ssr: false
  }
)

export const DataspaceEntities = dynamic(
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

export const DataspaceListConfiguration = dynamic(
  async () => import('./dataspace/dataspaceListConfiguration/DataspaceListConfiguration'),
  {
    ssr: false
  }
)

export const DataspaceList = dynamic(
  async () => import('./dataspace/dataspaceList/DataspaceList'),
  {
    ssr: false
  }
)

export const DataspaceFilters = dynamic(
  async () => import('./dataspace/dataspaceFilters/DataspaceFilters'),
  {
    ssr: false
  }
)
