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

export const Content = dynamic(async () => import('./content/Content'), {
  ssr: false
})

export const PageTitle = dynamic(async () => import('./pageTitle/PageTitle'), {
  ssr: false
})

export const ExploreListConfiguration = dynamic(
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

export const ExploreList = dynamic(
  async () => import('./explore/exploreList/ExploreList'),
  {
    ssr: false
  }
)

const DataspaceEntities = dynamic(
  async () => import('./dataspaceDashboard/dataspaceEntities/DataspaceEntities'),
  { ssr: false }
)


export const ExploreFilters = dynamic(
  async () => import('./explore/exploreFilters/ExploreFilters'),
  {
    ssr: false
  }
)

export { Layout, DataspaceOptions, DataspaceSummary, DataspaceEntities }
