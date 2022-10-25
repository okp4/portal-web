import fs from 'fs'
import Immutable from 'immutable'
import type { Map } from 'immutable'
import type { DataspaceDto } from '../../dto/DataspaceDto'
import type { DatasetDto } from '../../dto/DatasetDto'
import type { ServiceDto } from '../../dto/ServiceDto'

const readFile = (file: string): string | null => {
  try {
    return fs.readFileSync(`${process.env.DATA_PATH}/${file}.json`).toString()

    // eslint-disable-next-line @typescript-eslint/no-implicit-any-catch, @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      console.error(`File ${file}.json not found.`)
      return null
    } else {
      console.error(err)
      process.exit(1)
    }
  }
}

function initMap<T extends { id: string }>(fileName: string): Map<string, T> {
  const file: string | null = readFile(fileName)

  if (file === null) return Immutable.Map()

  return Immutable.Map(
    (JSON.parse(file) as T[]).reduce(
      // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
      (acc: Record<string, T>, item: T) => ({
        ...acc,
        [item.id]: item
      }),
      {}
    )
  )
}

const dataspaces: Map<string, DataspaceDto> = initMap<DataspaceDto>('dataspace')
const datasets: Map<string, DatasetDto> = initMap<DatasetDto>('dataset')
const services: Map<string, ServiceDto> = initMap<ServiceDto>('service')

export { dataspaces, datasets, services }
