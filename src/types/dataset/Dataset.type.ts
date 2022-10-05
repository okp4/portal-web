export type DatasetGovernance = {
  readonly name: string
  readonly based: string
}

export type Dataset = {
  readonly id: string
  readonly mainPicture: string
  readonly name: string
  readonly type: string
  readonly access: 'PRIVATE' | 'PUBLIC'
  readonly categories: Array<string>
  readonly description: string
  readonly provider: string
  readonly governance: DatasetGovernance
  readonly size: number
  readonly format: string
  readonly quality: number
  readonly completeness: number
  readonly updatedOn: string
}
