export type DataspaceDto = {
  id: string
  type: "dataspace"
  name: string
  access: string
  creator: string
  categories: string[]
  description: string
  token: string
  members: number
  datasets: number
  services: number
  createdOn: string
  updatedOn: string
}
