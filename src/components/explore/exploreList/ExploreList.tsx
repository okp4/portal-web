import { List, ListItem, Typography, useTranslation } from '@okp4/ui'
import type { DeepReadonly, UseTranslationResponse } from '@okp4/ui'
import { CExplore } from '../../../constants/explore/CExplore.constant'
import type { Explore } from '../../../types/explore/Explore.type'
import styles from './ExploreList.module.scss'
import { format } from 'date-fns'

type ItemDescriptionProps = {
  readonly type: string
  readonly categories: Array<string>
}

type ItemFooterProps = {
  readonly provider: string
  readonly updatedAt: Date
}

const ItemDescription = ({ type, categories }: DeepReadonly<ItemDescriptionProps>): JSX.Element => {
  return (
    <div className={styles.itemDescription}>
      {/* COLOR SHOULD BE secondary-button */}
      <Typography as="span" color="inverted-text" fontSize="small" fontWeight="light">
        {type}
      </Typography>

      <Typography as="p" color="inverted-text" fontSize="small" fontWeight="light">
        {categories.join(', ')}
      </Typography>
    </div>
  )
}

const ItemFooter = ({ provider, updatedAt }: DeepReadonly<ItemFooterProps>): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()

  return (
    <div className={styles.itemFooter}>
      {/* COLOR SHOULD BE secondary-button */}
      <Typography as="span" color="inverted-text" fontSize="small" fontWeight="light">
        {`${t('explore:listing:by')} ${provider}`}
      </Typography>

      <Typography as="span" color="inverted-text" fontSize="small" fontWeight="light">
        -
      </Typography>

      <Typography as="span" color="inverted-text" fontSize="small" fontWeight="light">
        {`${t('explore:listing:last-update')} ${format(updatedAt, 'dd/MM/yyyy')}`}
      </Typography>
    </div>
  )
}

const ExploreList = (): JSX.Element => {
  return (
    <div className="okp4-explore-list">
      <List>
        {CExplore.map((item: DeepReadonly<Explore>): JSX.Element => {
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
