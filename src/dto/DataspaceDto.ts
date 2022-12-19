export type Rule = {
  title: string
  rule: string
}

export type GovernanceContent = {
  subCategory?: string
  rules: Rule[]
}

export type Governance = {
  accessControl: GovernanceContent[]
  dataManagement: GovernanceContent[]
  serviceManagement: GovernanceContent[]
  businessModel: GovernanceContent[]
  governance: GovernanceContent[]
}

export type DataspaceDto = {
  id: string
  type: 'dataspace'
  name: string
  access: string
  creator: string
  categories: string[]
  description: string
  token: string
  members: number
  datasets: number
  services: number
  governance: Governance
  createdOn: string
  updatedOn: string
}
