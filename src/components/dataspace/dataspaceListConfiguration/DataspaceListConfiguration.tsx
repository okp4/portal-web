import { Typography, Select, Button, useTranslation } from '@okp4/ui'
import type {
  DeepReadonly,
  SelectValue,
  UseTranslationResponse,
  SelectOption,
} from '@okp4/ui'
import './dataspaceListConfiguration.scss'
import { useCallback } from 'react'

type DataspaceListConfigurationProps = {
  readonly rangeOptions: Array<SelectOption>
  readonly range: string
  readonly onLayoutChange: (value: 'grid' | 'list' | undefined) => void
  readonly onRangeChange: (value: SelectValue) => void
  readonly onSortByChange: (value: SelectValue) => void
  readonly sortBy: string
  readonly sortOptions: Array<SelectOption>
}

type ListConfigurationContainerProps = {
  readonly children: React.ReactNode
  readonly title: string
}

const ListConfigurationContainer = ({
  children,
  title
}: DeepReadonly<ListConfigurationContainerProps>): JSX.Element => (
  <div className="okp4-dataspace-list-configuration-container">
    <Typography fontSize="small">{title}:</Typography>
    <div className="content">{children}</div>
  </div>
)

// eslint-disable-next-line max-lines-per-function
const DataspaceListConfiguration = ({
  range,
  rangeOptions,
  onLayoutChange,
  onRangeChange,
  onSortByChange,
  sortBy,
  sortOptions
}: DeepReadonly<DataspaceListConfigurationProps>): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()

  const onGridClick = useCallback(() => {
    onLayoutChange('grid')
  }, [onLayoutChange])

  const onListClick = useCallback(() => {
    onLayoutChange('list')
  }, [onLayoutChange])

  return (
    <div className="okp4-dataspace-list-configuration">
      <ListConfigurationContainer title={t('dataspace:listing:configuration:show')}>
        <Select onChange={onRangeChange} options={rangeOptions} size="x-small" value={range} />
        <Typography fontSize="small">{t('dataspace:listing:configuration:elements')}</Typography>
      </ListConfigurationContainer>
      <ListConfigurationContainer title={t('dataspace:listing:configuration:display')}>
        <Button
          label={t('dataspace:listing:configuration:grid')}
          onClick={onGridClick}
          size="small"
        />
        <Button
          label={t('dataspace:listing:configuration:list')}
          onClick={onListClick}
          size="small"
        />
      </ListConfigurationContainer>
      <ListConfigurationContainer title={t('dataspace:listing:configuration:sort')}>
        <Select
          onChange={onSortByChange}
          options={sortOptions.map((item: DeepReadonly<SelectOption>) => {
            return {
              label: t(`dataspace:listing:configuration:select:${item.label}`),
              value: item.value
            }
          })}
          size="small"
          value={sortBy}
        />
      </ListConfigurationContainer>
    </div>
  )
}

export default DataspaceListConfiguration
