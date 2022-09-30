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

export const DataverseListConfiguration = dynamic(
  async () => import('./dataverse/dataverseListConfiguration/DataverseListConfiguration'),
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

export const DataverseList = dynamic(
  async () => import('./dataverse/dataverseList/DataverseList'),
  {
    ssr: false
  }
)

const DataspaceEntities = dynamic(
  async () => import('./dataspaceDashboard/dataspaceEntities/DataspaceEntities'),
  { ssr: false }
)

export const DataverseFilters = dynamic(
  async () => import('./dataverse/dataverseFilters/DataverseFilters'),
  {
    ssr: false
  }
)

export { Layout, DataspaceOptions, DataspaceSummary, DataspaceEntities }
