export type Dataspace = {
  readonly id: string
  readonly dataspaceId: string
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
  readonly completness: number
  readonly createdOn: string
  readonly updatedOn: string
}
