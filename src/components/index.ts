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

export const DataspaceListConfiguration = dynamic(
  async () => import('./dataspace/dataspaceListConfiguration/DataspaceListConfiguration'),
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

export const DataspaceList = dynamic(
  async () => import('./dataspace/dataspaceList/DataspaceList'),
  {
    ssr: false
  }
)

const DataspaceEntities = dynamic(
  async () => import('./dataspaceDashboard/dataspaceEntities/DataspaceEntities'),
  { ssr: false }
)

export const DataspaceFilters = dynamic(
  async () => import('./dataspace/dataspaceFilters/DataspaceFilters'),
  {
    ssr: false
  }
)

export { Layout, DataspaceOptions, DataspaceSummary, DataspaceEntities }
