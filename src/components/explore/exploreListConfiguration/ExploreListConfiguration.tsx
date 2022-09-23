import { Typography, Select, Button, useTranslation } from '@okp4/ui'
import type {
  DeepReadonly,
  UseState,
  SelectValue,
  UseTranslationResponse,
  SelectOption
} from '@okp4/ui'
import { useState } from 'react'
import styles from './ExploreListConfiguration.module.scss'
import { CExploreListConfigurationShowRange } from './constants/CExploreListConfigurationShowRange.constant'
import { CExploreListConfigurationSortBy } from './constants/CExploreListConfigurationSortBy.constant'

type ExploreListConfigurationContainer = {
  readonly title: string
  readonly children: JSX.Element
}

const ExploreListConfigurationContainer = ({
  title,
  children
}: DeepReadonly<ExploreListConfigurationContainer>): JSX.Element => {
  return (
    <div className={styles.container}>
      <div>
        <Typography as="span" fontSize="small" fontWeight="light">
          {`${title}:`}
        </Typography>
      </div>

      <div className={styles.secondRow}>{children}</div>
    </div>
  )
}

// eslint-disable-next-line max-lines-per-function
const ExploreListConfiguration = (): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()
  const [range, setRange]: UseState<SelectValue> = useState<SelectValue>(
    CExploreListConfigurationShowRange[0].value
  )
  const [sortBy, setSortBy]: UseState<SelectValue> = useState<SelectValue>(
    CExploreListConfigurationSortBy[0].value
  )

  return (
    <div className={`okp4-explore-list-configuration ${styles.content}`}>
      <ExploreListConfigurationContainer title={t('explore:listing:configuration:show')}>
        <>
          <Select
            onChange={setRange}
            options={CExploreListConfigurationShowRange}
            size="x-small"
            value={range}
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
          onChange={setSortBy}
          options={CExploreListConfigurationSortBy.map((item: DeepReadonly<SelectOption>) => {
            return {
              label: t(`explore:listing:configuration:select:${item.label}`),
              value: 'asc'
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
