import { useCallback } from 'react'
import { Typography, Select, Button, useTranslation } from '@okp4/ui'
import type { DeepReadonly, SelectValue, UseTranslationResponse, SelectOption } from '@okp4/ui'
import type { ExploreListLayout } from '../../../pages/dataverse/explore'

type ExploreListConfigurationProps = {
  readonly rangeOptions: Array<SelectOption>
  readonly range: string
  readonly sortBy: string
  readonly sortOptions: Array<SelectOption>
  readonly onLayoutChange: (value: ExploreListLayout) => void
  readonly onRangeChange: (value: SelectValue) => void
  readonly onSortByChange: (value: SelectValue) => void
}

type ListConfigurationColumnProps = {
  readonly children: React.ReactNode
  readonly title: string
}

const ListConfigurationColumn = ({
  children,
  title
}: DeepReadonly<ListConfigurationColumnProps>): JSX.Element => (
  <div className="okp4-explore-list-configuration-column">
    <Typography fontSize="small">{title}</Typography>
    <div className="okp4-explore-list-configuration-column-content">{children}</div>
  </div>
)

const ExploreListConfiguration = ({
  range,
  rangeOptions,
  sortBy,
  sortOptions,
  onLayoutChange,
  onRangeChange,
  onSortByChange
}: DeepReadonly<ExploreListConfigurationProps>): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()

  const handleGridClick = useCallback(
    (value: ExploreListLayout) => (): void => {
      onLayoutChange(value)
    },
    [onLayoutChange]
  )

  return (
    <div className="okp4-explore-list-configuration">
      <ListConfigurationColumn title={t('explore:list:configuration:show')}>
        <Select onChange={onRangeChange} options={rangeOptions} size="x-small" value={range} />
        <Typography fontSize="small">{t('explore:list:configuration:elements')}</Typography>
      </ListConfigurationColumn>
      <ListConfigurationColumn title={t('explore:list:configuration:display')}>
        <Button
          label={t('explore:list:configuration:grid')}
          onClick={handleGridClick('grid')}
          size="small"
        />
        <Button
          label={t('explore:list:configuration:list')}
          onClick={handleGridClick('list')}
          size="small"
        />
      </ListConfigurationColumn>
      <ListConfigurationColumn title={t('explore:list:configuration:sort')}>
        <Select
          onChange={onSortByChange}
          options={sortOptions.map((item: DeepReadonly<SelectOption>) => ({
            label: t(`explore:list:configuration:select:${item.label}`),
            value: item.value
          }))}
          size="small"
          value={sortBy}
        />
      </ListConfigurationColumn>
    </div>
  )
}

export default ExploreListConfiguration
