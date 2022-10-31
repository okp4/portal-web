import { useCallback } from 'react'
import type { DeepReadonly, SelectOption, SelectValue, UseTranslationResponse } from '@okp4/ui'
import { Select, Typography, useTranslation } from '@okp4/ui'
import './ExploreFilters.scss'

type ExploreFiltersProps = {
  readonly filters: string[]
  readonly filtersOptions: SelectOption[]
  readonly onFiltersChange: (values: SelectValue) => void
}

// eslint-disable-next-line max-lines-per-function
const ExploreFilters = ({
  filters,
  filtersOptions,
  onFiltersChange
}: DeepReadonly<ExploreFiltersProps>): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()

  const handleChange = useCallback(
    (selected: DeepReadonly<SelectValue>) => {
      onFiltersChange(selected)
    },
    [onFiltersChange]
  )

  return (
    <div className="okp4-explore-filters">
      <Typography as="h2">{t('explore:filters:title')}</Typography>

      <Select
        multiple={true}
        onChange={handleChange}
        options={filtersOptions}
        size="small"
        value={filters}
      />
    </div>
  )
}

export default ExploreFilters
