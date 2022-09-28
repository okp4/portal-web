export type ExploreMetadata = {
  readonly size: number
  readonly format: string
  readonly quality: number
  readonly completude: number
  readonly provider: string
  readonly updatedAt: string
}

export type Explore = {
  readonly id: string
  readonly name: string
  readonly type: string
  readonly access: 'PRIVATE' | 'PUBLIC'
  readonly categories: Array<string>
  readonly description: string
  readonly provider: string
  readonly governance: string
  readonly metadata: ExploreMetadata
  readonly updatedAt: string
}
