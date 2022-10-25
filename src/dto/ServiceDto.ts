export type ServiceDto = {
  id: string
  dataspaceId: string
  type: string
  name: string
  access: string
  categories: string[]
  description: string
  provider: string
  creator: string
  nbInputFiles: number
  inputFormat: string[]
  nbOutputFiles: number
  outputFormat: string[] | null
  createdOn: Date
  updatedOn: Date
}
