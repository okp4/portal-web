import { List, ListItem, Typography, useTranslation } from '@okp4/ui'
import type { DeepReadonly, UseState, UseTranslationResponse } from '@okp4/ui'
import type { Dataverse } from '../../../types/dataverse/Dataverse.type'
import './dataverseList.scss'
import { useEffect, useState } from 'react'
import { formatDate } from '../../../utils'

type DataverseListProps = {
  readonly range: string
  readonly sortBy: string
}

type ItemDescriptionProps = {
  readonly type: string
  readonly categories: Array<string>
}

type ItemRightElementProps = {
  readonly provider: string
  readonly updatedAt: string
}

const ItemDescription = ({ type, categories }: DeepReadonly<ItemDescriptionProps>): JSX.Element => (
  <div className="okp4-item-description">
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
  updatedAt
}: DeepReadonly<ItemRightElementProps>): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()

  return (
    <Typography color="inverted-text" fontSize="small">
      {`${t('dataverse:by')} ${provider}`} -{' '}
      {`${t('dataverse:last-update')} ${formatDate(updatedAt)}`}
    </Typography>
  )
}

const fetchItems = async (url: string): Promise<Array<Dataverse>> => {
  const response = await fetch(url)

  if (response.status !== 200) {
    throw new Error(response.statusText)
  }

  return await response.json()
}

const DataverseList = ({ range, sortBy }: DeepReadonly<DataverseListProps>): JSX.Element => {
  const [items, setItems]: UseState<Array<Dataverse>> = useState<Array<Dataverse>>([])

  useEffect(() => {
    fetchItems(`/api/fake/dataverses?range=${range}&sortBy=${sortBy}`)
      .then(setItems)
      .catch((err: unknown) => console.error(err))
  }, [range, sortBy])

  return (
    <div className="okp4-dataverse-list">
      <List>
        {items.map(
          (item: DeepReadonly<Dataverse>): JSX.Element => (
            <ListItem
              description={<ItemDescription categories={item.categories} type={item.type} />}
              key={item.id}
              rightElement={
                <ItemRightElement provider={item.provider} updatedAt={item.updatedAt} />
              }
              title={item.name}
            />
          )
        )}
      </List>
    </div>
  )
}

export default DataverseList
