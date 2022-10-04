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

const DataspaceEntities = dynamic(
  async () => import('./dataspaceDashboard/dataspaceEntities/DataspaceEntities'),
  {
    ssr: false
  }
)

export { DataspaceOptions, DataspaceSummary, DataspaceEntities }
