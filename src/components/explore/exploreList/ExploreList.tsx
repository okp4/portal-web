import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import type { NextRouter } from 'next/router'
import { List, ListItem, Typography, useTranslation } from '@okp4/ui'
import type { DeepReadonly, UseState, UseTranslationResponse } from '@okp4/ui'
import './exploreList.scss'
import { fetchConfig, formatDate } from '../../../utils'
import type { ExploreListLayout } from '../../../pages/dataverse/explore'
import type { DataspaceDto } from '../../../dto/DataspaceDto'
import type { DatasetDto } from '../../../dto/DatasetDto'
import type { ServiceDto } from '../../../dto/ServiceDto'

type ExploreListProps = {
  readonly layout: ExploreListLayout
  readonly range: number
  readonly sortBy: string
}

type ItemDescriptionProps = {
  readonly type: string
  readonly categories: Array<string>
}

type ItemRightElementProps = {
  readonly provider: string
  readonly updatedOn: string
}

type DataverseEntity = DataspaceDto | DatasetDto | ServiceDto

const ItemDescription = ({ type, categories }: DeepReadonly<ItemDescriptionProps>): JSX.Element => (
  <div className="okp4-explore-list-item-description">
    <Typography color="inverted-text" fontSize="small">
      {type}
    </Typography>
    <Typography as="p" color="inverted-text" fontSize="small">
      {categories.join(', ')}
    </Typography>
  </div>
)

const ItemRightElement = ({
  provider,
  updatedOn
}: DeepReadonly<ItemRightElementProps>): JSX.Element => {
  const { t, i18n }: UseTranslationResponse = useTranslation()

  return (
    <Typography color="inverted-text" fontSize="small">
      {t('explore:by', {
        provider: provider,
        updated: formatDate(updatedOn, i18n.language)
      })}
    </Typography>
  )
}

const fetchItems = async (
  range: number,
  sortBy: string
): Promise<DeepReadonly<DataverseEntity[]>> => {
  const config = await fetchConfig()
  const responses = [
    await fetch(`${config.app.apiUri}/dataverse/dataspace/`),
    await fetch(`${config.app.apiUri}/dataverse/dataset/`),
    await fetch(`${config.app.apiUri}/dataverse/service/`)
  ]

  const items = (
    await Promise.all(
      responses.map(
        async (item: DeepReadonly<Response>): Promise<DataverseEntity> =>
          item.ok ? await item.json() : []
      )
    )
  ).flat()

  switch (sortBy) {
    case 'name':
      items.sort((a: DeepReadonly<DataverseEntity>, b: DeepReadonly<DataverseEntity>) =>
        a.name.localeCompare(b.name)
      )
      break
    case 'createdOn':
      items.sort((a: DeepReadonly<DataverseEntity>, b: DeepReadonly<DataverseEntity>) =>
        b.createdOn.localeCompare(a.createdOn)
      )
      break
    default:
      break
  }

  return items.slice(0, range)
}

// eslint-disable-next-line max-lines-per-function
const ExploreList = ({ layout, range, sortBy }: DeepReadonly<ExploreListProps>): JSX.Element => {
  const router: NextRouter = useRouter()
  const [items, setItems]: UseState<DeepReadonly<DataverseEntity[]>> = useState<
    DeepReadonly<DataverseEntity[]>
  >([])

  useEffect(() => {
    fetchItems(range, sortBy)
      .then(setItems)
      .catch((err: DeepReadonly<Error>) => console.error(err))
  }, [range, sortBy])

  const onListItemClick = useCallback(
    (item: DeepReadonly<DataverseEntity>) => (): void => {
      switch (item.type) {
        case 'dataspace':
          router.push(`/dataverse/explore/dataspace/${item.id}`)
          return
        case 'dataset':
          router.push(`/dataverse/explore/dataspace/${item.dataspaceId}/dataset/${item.id}`)
          return
        case 'service':
          router.push(`/dataverse/explore/dataspace/${item.dataspaceId}/service/${item.id}`)
          return
        default:
          return
      }
    },
    [router]
  )

  return (
    <div className="okp4-explore-list">
      <List layout={layout}>
        {items.map(
          (item: DeepReadonly<DataverseEntity>): JSX.Element => (
            <ListItem
              description={<ItemDescription categories={item.categories} type={item.type} />}
              key={item.id}
              lastElement={
                <ItemRightElement
                  provider={item.type === 'dataspace' ? item.creator : item.provider}
                  updatedOn={item.updatedOn}
                />
              }
              onClick={onListItemClick(item)}
              title={item.name}
            />
          )
        )}
      </List>
    </div>
  )
}

export default ExploreList
