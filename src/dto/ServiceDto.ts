export type ServiceDto = {
  id: string
  dataspaceId: string
  type: "service"
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
  createdOn: string
  updatedOn: string
}
