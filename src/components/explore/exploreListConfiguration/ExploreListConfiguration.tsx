import { Typography, Select, Button } from '@okp4/ui'
import type { DeepReadonly, UseState, SelectValue } from '@okp4/ui'
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
          {title}
        </Typography>
      </div>

      <div className={styles.secondRow}>{children}</div>
    </div>
  )
}

// eslint-disable-next-line max-lines-per-function
const ExploreListConfiguration = (): JSX.Element => {
  const [range, setRange]: UseState<SelectValue> = useState<SelectValue>(
    CExploreListConfigurationShowRange[0].value
  )
  const [sortBy, setSortBy]: UseState<SelectValue> = useState<SelectValue>(
    CExploreListConfigurationSortBy[0].value
  )

  return (
    <div className={`okp4-explore-list-configuration ${styles.content}`}>
      <ExploreListConfigurationContainer title="Show:">
        <>
          <Select
            onChange={setRange}
            options={CExploreListConfigurationShowRange}
            size="x-small"
            value={range}
          />
          <Typography as="span" fontSize="small" fontWeight="light">
            elements
          </Typography>
        </>
      </ExploreListConfigurationContainer>

      <ExploreListConfigurationContainer title="Display:">
        <>
          <Button label="Grid" size="small" />
          <Button label="List" size="small" />
        </>
      </ExploreListConfigurationContainer>

      <ExploreListConfigurationContainer title="Sort by:">
        <Select
          onChange={setSortBy}
          options={CExploreListConfigurationSortBy}
          size="x-small"
          value={sortBy}
        />
      </ExploreListConfigurationContainer>
    </div>
  )
}

export default ExploreListConfiguration
