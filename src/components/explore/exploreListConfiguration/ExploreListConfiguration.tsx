import { Typography, Select, Button, useTranslation } from '@okp4/ui'
import type {
  DeepReadonly,
  SelectValue,
  UseTranslationResponse,
  SelectOption
} from '@okp4/ui'
import './ExploreListConfiguration.scss'
import { CExploreListConfigurationShowRange } from '../../../constants/explore/CExploreListConfigurationShowRange.constant'
import { CExploreListConfigurationSortBy } from '../../../constants/explore/CExploreListConfigurationSortBy.constant'

type ExploreListConfigurationProps = {
  range: string
  onRangeChange: (value: SelectValue) => void
  onSortByChange: (value: SelectValue) => void
  sortBy: string
}

type ExploreListConfigurationContainer = {
  readonly title: string
  readonly children: React.ReactNode
}

const ExploreListConfigurationContainer = ({
  title,
  children
}: DeepReadonly<ExploreListConfigurationContainer>): JSX.Element => (
  <div className="okp4-explore-list-configuration-container">
    <div>
      <Typography as="span" fontSize="small" fontWeight="light">
        {`${title}:`}
      </Typography>
    </div>

    <div className="content">{children}</div>
  </div>
)

// eslint-disable-next-line max-lines-per-function
const ExploreListConfiguration = ({
  range,
  onRangeChange,
  onSortByChange,
  sortBy
}: DeepReadonly<ExploreListConfigurationProps>): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()

  return (
    <div className="okp4-explore-list-configuration">
      <ExploreListConfigurationContainer title={t('explore:listing:configuration:show')}>
        <>
          <Select
            onChange={onRangeChange}
            options={CExploreListConfigurationShowRange}
            size="x-small"
            value={range.toString()}
          />
          <Typography as="span" fontSize="small" fontWeight="light">
            {t('explore:listing:configuration:elements')}
          </Typography>
        </>
      </ExploreListConfigurationContainer>

      <ExploreListConfigurationContainer title={t('explore:listing:configuration:display')}>
        <>
          <Button label={t('explore:listing:configuration:grid')} size="small" />
          <Button label={t('explore:listing:configuration:list')} size="small" />
        </>
      </ExploreListConfigurationContainer>

      <ExploreListConfigurationContainer title={t('explore:listing:configuration:sort')}>
        <Select
          onChange={onSortByChange}
          options={CExploreListConfigurationSortBy.map((item: DeepReadonly<SelectOption>) => {
            return {
              label: t(`explore:listing:configuration:select:${item.label}`),
              value: item.value
            }
          })}
          size="small"
          value={sortBy}
        />
      </ExploreListConfigurationContainer>
    </div>
  )
}

export default ExploreListConfiguration
