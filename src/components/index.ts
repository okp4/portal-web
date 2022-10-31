import dynamic from 'next/dynamic'

const Layout = dynamic(async () => import('./layout/Layout'), {
  ssr: false
})

const DataspaceOptions = dynamic(
  async () => import('./dataspaceDashboard/dataspaceOptions/DataspaceOptions'),
  {
    ssr: false
  }
)

const PageTitle = dynamic(async () => import('./pageTitle/PageTitle'), {
  ssr: false
})

const ExploreListConfiguration = dynamic(
  async () => import('./explore/exploreListConfiguration/ExploreListConfiguration'),
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

const ExploreList = dynamic(async () => import('./explore/exploreList/ExploreList'), {
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
  { ssr: false }
)

const ExploreFilters = dynamic(async () => import('./explore/exploreFilters/ExploreFilters'), {
  ssr: false
})

export const DatasetInformation = dynamic(
  async () => import('./dataset/datasetInformation/DatasetInformation'),
  {
    ssr: false
  }
)

export {
  PageTitle,
  Layout,
  DataspaceOptions,
  DataspaceSummary,
  DataspaceEntities,
  ExploreFilters,
  ExploreList,
  ExploreListConfiguration
}
