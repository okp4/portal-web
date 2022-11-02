export type DatasetDto = {
  id: string
  dataspaceId: string
  final_dataset?: boolean
  mainPicture: string
  type: 'dataset'
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
  createdOn: string
  updatedOn: string
}
