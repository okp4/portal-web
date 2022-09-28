import { List, ListItem, Typography, useTranslation } from '@okp4/ui'
import type { DeepReadonly, UseState, UseTranslationResponse } from '@okp4/ui'
import type { Explore } from '../../../types/explore/Explore.type'
import './ExploreList.scss'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'

type ExploreListProps = {
  readonly range: string
  readonly sortBy: string
}

type ItemDescriptionProps = {
  readonly type: string
  readonly categories: Array<string>
}

type ItemFooterProps = {
  readonly provider: string
  readonly updatedAt: string
}

const ItemDescription = ({ type, categories }: DeepReadonly<ItemDescriptionProps>): JSX.Element => (
  <>
    {/* COLOR SHOULD BE secondary-button */}
    <Typography as="span" color="inverted-text" fontSize="small" fontWeight="light">
      {type}
    </Typography>

    <Typography as="p" color="inverted-text" fontSize="small" fontWeight="light">
      {categories.join(', ')}
    </Typography>
  </>
)

const ItemFooter = ({ provider, updatedAt }: DeepReadonly<ItemFooterProps>): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()

  return (
    // COLOR SHOULD BE secondary-button
    <Typography as="span" color="inverted-text" fontSize="small" fontWeight="light">
      {`${t('explore:listing:by')} ${provider}`} -{' '}
      {`${t('explore:listing:last-update')} ${format(new Date(updatedAt), 'dd/MM/yyyy')}`}
    </Typography>
  )
}

const fetchItems = async (url: string): Promise<Array<Explore>> => {
  const response = await fetch(url)

  if (response.status !== 200) {
    throw new Error(response.statusText)
  }

  return await response.json()
}

const ExploreList = ({ range, sortBy }: DeepReadonly<ExploreListProps>): JSX.Element => {
  const [items, setItems]: UseState<Array<Explore>> = useState<Array<Explore>>([])

  useEffect(() => {
    fetchItems(`/api/fake/explores?range=${range}&sortBy=${sortBy}`)
      .then(setItems)
      .catch((err: unknown) => console.error(err))
  }, [range, sortBy])

  return (
    <div className="okp4-explore-list">
      <List>
        {items.map((item: DeepReadonly<Explore>): JSX.Element => {
          return (
            <ListItem
              description={<ItemDescription categories={item.categories} type={item.type} />}
              key={item.id}
              rightElement={<ItemFooter provider={item.provider} updatedAt={item.updatedAt} />}
              title={item.name}
            />
          )
        })}
      </List>
    </div>
  )
}

export default ExploreList
