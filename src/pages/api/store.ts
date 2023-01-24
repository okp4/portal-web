import type { Dirent } from 'fs'
import fs from 'fs'
import path from 'path'

const fsp = fs.promises

const dataspacesPath = path.join(process.env.DATA_PATH, 'dataspaces')
const dataspaceFilename = 'dataspace.json'
const datasetsDir = `datasets`
const servicesDir = `services`

const lsDataspaces = async (): Promise<string[]> => fsp.readdir(dataspacesPath, { withFileTypes: true })
  .then((paths: Dirent[]) => paths.filter((e: Dirent) => e.isDirectory())
    .map((d: Dirent) => d.name)
  )

export const getDataspaces = async (): Promise<any[]> => {
  const dataspaces = await lsDataspaces()
  return Promise.all(dataspaces.map(async (d: string) => getDataspace(d)))
}

export const getAllDatasets = async (): Promise<any[]> => {
  const dataspaces = await lsDataspaces()
  return Promise.all(
    dataspaces.map(async (ds: string) => getDataspaceDatasets(ds)
      .then((data: any[] | null) => !data ? [] : data))
  ).then((data: any[][]) => data.flat())
}

export const getAllServices = async (): Promise<any[]> => {
  const dataspaces = await lsDataspaces()
  return Promise.all(
    dataspaces.map(async (ds: string) => getDataspaceServices(ds)
      .then((data: any[] | null) => !data ? [] : data))
  ).then((data: any[][]) => data.flat())
}

export const getDataspaceDatasets = async (dataspaceId: string): Promise<any[] | null> => {
  const datasetFiles = await fsp.readdir(path.join(dataspacesPath, dataspaceId, datasetsDir))
  return Promise.all(
    datasetFiles
      .map((filename: string) => path.join(dataspacesPath, dataspaceId, datasetsDir, filename))
      .map(async (file: string) => fsp.readFile(file, { encoding: 'utf-8' }))
  ).catch((err: any) => {
    if (err.code === 'ENOENT') {
      return null
    }
    throw err
  })
}

export const getDataspaceServices = async (dataspaceId: string): Promise<any[] | null> => {
  const serviceFiles = await fsp.readdir(path.join(dataspacesPath, dataspaceId, servicesDir))
  return Promise.all(
    serviceFiles
      .map((filename: string) => path.join(dataspacesPath, dataspaceId, servicesDir, filename))
      .map(async (file: string) => fsp.readFile(file, { encoding: 'utf-8' }))
  ).catch((err: any) => {
    if (err.code === 'ENOENT') {
      return null
    }
    throw err
  })
}

export const getDataspace = async (id: string): Promise<any> => fsp.readFile(
  path.join(dataspacesPath, id, dataspaceFilename),
  { encoding: 'utf-8' }
).catch((err: any) => {
  if (err.code === 'ENOENT') {
    return null
  }
  throw err
})

export const getDataset = async (dataspaceId: string, id: string): Promise<any> => fsp.readFile(
  path.join(dataspacesPath, dataspaceId, datasetsDir, `${id}.json`),
  { encoding: 'utf-8' }
).catch((err: any) => {
  if (err.code === 'ENOENT') {
    return null
  }
  throw err
})

export const createDataset = async (dataspaceId: string, dataset: any): Promise<void> => {
  dataset.dataspaceId = dataspaceId

  return fsp.writeFile(
    path.join(dataspacesPath, dataspaceId, datasetsDir, `${dataset.id}.json`),
    JSON.stringify(dataset)
  ).then(() => dataset.id)
}
