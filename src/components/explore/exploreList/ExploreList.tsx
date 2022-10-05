import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import type { NextRouter } from 'next/router'
import { List, ListItem, Typography, useTranslation } from '@okp4/ui'
import type { DeepReadonly, UseState, UseTranslationResponse } from '@okp4/ui'
import type { Dataspace } from '../../../types/dataspace/Dataspace.type'
import './exploreList.scss'
import { formatDate } from '../../../utils'
import type { ExploreListLayout } from '../../../pages/explore'

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
      {`${t('explore:by')} ${provider} - ${t('explore:last-update')} ${formatDate(
        updatedOn,
        i18n.language
      )}`}
    </Typography>
  )
}

const fetchItems = async (url: string): Promise<Array<Dataspace>> => {
  const response = await fetch(url)

  if (response.status !== 200) {
    throw new Error(response.statusText)
  }

  const items: Array<Dataspace> = await response.json()

  return items
}

const ExploreList = ({ layout, range, sortBy }: DeepReadonly<ExploreListProps>): JSX.Element => {
  const router: NextRouter = useRouter()
  const [items, setItems]: UseState<Array<Dataspace>> = useState<Array<Dataspace>>([])

  useEffect(() => {
    fetchItems(`/api/fake/explore?range=${range}&sortBy=${sortBy}`)
      .then(setItems)
      .catch((err: unknown) => console.error(err))
  }, [range, sortBy])

  const onListItemClick = useCallback(
    (item: DeepReadonly<Dataspace>) => (): void => {
      if (item.type === 'dataspace') {
        router.push(`/dataspace/${item.dataspaceId}`)
        return
      }

      router.push(`/dataspace/${item.dataspaceId}/${item.type}/${item.id}`)
    },
    [router]
  )

  return (
    <div className="okp4-explore-list">
      <List layout={layout}>
        {items.map(
          (item: DeepReadonly<Dataspace>): JSX.Element => (
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
