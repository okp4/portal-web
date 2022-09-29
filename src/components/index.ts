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

export const GoToPreviousPage = dynamic(async () => import('./goToPreviousPage/GoToPreviousPage'), {
  ssr: false
})

export const DataversePreview = dynamic(
  async () => import('./dataverse/dataversePreview/DataversePreview'),
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

export const DataverseInformation = dynamic(
  async () => import('./dataverse/dataverseInformation/DataverseInformation'),
  {
    ssr: false
  }
)

export { DataspaceOptions, DataspaceSummary, DataspaceEntities }
