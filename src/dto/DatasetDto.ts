export type DatasetDto = {
  id: string
  dataspaceId: string
  type: string
  name: string
  access: string
  categories: string[]
  description: string
  provider: string
  creator: string
  size: number
  format: string
  quality: number
  completude: number
  createdOn: Date
  updatedOn: Date
}
