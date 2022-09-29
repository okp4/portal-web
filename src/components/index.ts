import dynamic from 'next/dynamic'

const Layout = dynamic(
  async () => import('./layout/Layout'),
  {
    ssr: false
  }
)

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

const ExploreList = dynamic(
  async () => import('./explore/exploreList/ExploreList'), {
    ssr: false
  })

export const GoToPreviousPage = dynamic(async () => import('./goToPreviousPage/GoToPreviousPage'), {
  ssr: false
})

export const DataversePreview = dynamic(
  async () => import('./dataverse/dataversePreview/DataversePreview'),
  {
    ssr: false
  }
)

export const DataverseInformation = dynamic(
  async () => import('./dataverse/dataverseInformation/DataverseInformation'),
  {
    ssr: false
  }
)

const DataspaceEntities = dynamic(
  async () => import('./dataspaceDashboard/dataspaceEntities/DataspaceEntities'),
  { ssr: false }
)


const ExploreFilters = dynamic(
  async () => import('./explore/exploreFilters/ExploreFilters'),
  {
    ssr: false
  }
)

export { PageTitle, Layout, DataspaceOptions, DataspaceSummary, DataspaceEntities, ExploreFilters, ExploreList, ExploreListConfiguration }
