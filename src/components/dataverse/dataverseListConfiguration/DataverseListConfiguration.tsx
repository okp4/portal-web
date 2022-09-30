import { Typography, Select, Button, useTranslation } from '@okp4/ui'
import type { DeepReadonly, SelectValue, UseTranslationResponse, SelectOption } from '@okp4/ui'
import './dataverseListConfiguration.scss'

type ExploreListConfigurationProps = {
  readonly rangeOptions: Array<SelectOption>
  readonly range: string
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
  <div className="okp4-dataverse-list-configuration-container">
    <Typography fontSize="small">{title}:</Typography>
    <div className="content">{children}</div>
  </div>
)

// eslint-disable-next-line max-lines-per-function
const DataverseListConfiguration = ({
  range,
  rangeOptions,
  onRangeChange,
  onSortByChange,
  sortBy,
  sortOptions
}: DeepReadonly<ExploreListConfigurationProps>): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()

  return (
    <div className="okp4-dataverse-list-configuration">
      <ListConfigurationContainer title={t('dataverse:listing:configuration:show')}>
        <>
          <Select onChange={onRangeChange} options={rangeOptions} size="x-small" value={range} />
          <Typography fontSize="small">{t('dataverse:listing:configuration:elements')}</Typography>
        </>
      </ListConfigurationContainer>
      <ListConfigurationContainer title={t('dataverse:listing:configuration:display')}>
        <>
          <Button label={t('dataverse:listing:configuration:grid')} size="small" />
          <Button label={t('dataverse:listing:configuration:list')} size="small" />
        </>
      </ListConfigurationContainer>
      <ListConfigurationContainer title={t('dataverse:listing:configuration:sort')}>
        <Select
          onChange={onSortByChange}
          options={sortOptions.map((item: DeepReadonly<SelectOption>) => {
            return {
              label: t(`dataverse:listing:configuration:select:${item.label}`),
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

export default DataverseListConfiguration
