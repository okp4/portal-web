import { useCallback } from 'react'
import { useRouter } from 'next/router'
import type { NextRouter } from 'next/router'
import { List, ListItem, Typography, useTranslation } from '@okp4/ui'
import type { DeepReadonly, UseTranslationResponse } from '@okp4/ui'
import { formatDate } from '../../../utils'
import type { DataverseEntity, ExploreListLayout } from '../../../pages/dataverse/explore'

type ExploreListProps = {
  readonly entities: DataverseEntity[]
  readonly layout: ExploreListLayout
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

const ExploreList = ({ entities, layout }: DeepReadonly<ExploreListProps>): JSX.Element => {
  const router: NextRouter = useRouter()

  const onListItemClick = useCallback(
    (entity: DeepReadonly<DataverseEntity>) => async () =>
      router.push(`/dataverse/explore/dataspace/${entity.dataspaceId}/${entity.type}/${entity.id}`),
    [router]
  )

  return (
    <div className="okp4-explore-list">
      <List layout={layout}>
        {entities.map(
          (item: DeepReadonly<DataverseEntity>): JSX.Element => (
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
