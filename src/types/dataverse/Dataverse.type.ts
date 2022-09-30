export type Dataverse = {
  readonly id: string
  readonly mainPicture: string
  readonly name: string
  readonly type: string
  readonly access: 'PRIVATE' | 'PUBLIC'
  readonly categories: Array<string>
  readonly description: string
  readonly provider: string
  readonly governance: string
  readonly size: number
  readonly format: string
  readonly quality: number
  readonly completude: number
  readonly createdAt: string
  readonly updatedAt: string
}
