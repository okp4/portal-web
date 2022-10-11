import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import type { NextRouter } from 'next/router'
import { List, ListItem, Typography, useTranslation } from '@okp4/ui'
import type { DeepReadonly, UseState, UseTranslationResponse } from '@okp4/ui'
import './exploreList.scss'
import { formatDate } from '../../../utils'
import type { ExploreListLayout } from '../../../pages/explore'

export type ExploreItem = {
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

type ExploreListProps = {
  readonly layout: ExploreListLayout
  readonly range: string
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

const fetchItems = async (url: string): Promise<Array<ExploreItem>> => {
  const response = await fetch(url)

  if (response.status !== 200) {
    throw new Error(response.statusText)
  }

  const items: Array<ExploreItem> = await response.json()

  return items
}

const ExploreList = ({ layout, range, sortBy }: DeepReadonly<ExploreListProps>): JSX.Element => {
  const router: NextRouter = useRouter()
  const [items, setItems]: UseState<Array<ExploreItem>> = useState<Array<ExploreItem>>([])

  useEffect(() => {
    fetchItems(`/api/fake/explore?range=${range}&sortBy=${sortBy}`)
      .then(setItems)
      .catch((err: DeepReadonly<Error>) => console.error(err))
  }, [range, sortBy])

  const onListItemClick = useCallback(
    (item: DeepReadonly<ExploreItem>) => (): void => {
      if (item.type === 'dataspace') {
        router.push(`/dataspace/${item.dataspaceId}`)
      } else {
        router.push(`/dataspace/${item.dataspaceId}/${item.type}/${item.id}`)
      }
    },
    [router]
  )

  return (
    <div className="okp4-explore-list">
      <List layout={layout}>
        {items.map(
          (item: DeepReadonly<ExploreItem>): JSX.Element => (
            <ListItem
              description={<ItemDescription categories={item.categories} type={item.type} />}
              key={item.id}
              lastElement={<ItemRightElement provider={item.provider} updatedOn={item.updatedOn} />}
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
