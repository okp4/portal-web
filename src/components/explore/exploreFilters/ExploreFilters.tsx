import { useCallback } from 'react'
import type {
  DeepReadonly,
  SelectOption,
  SelectValue,
  UseTranslationResponse,
  ThemeContextType
} from '@okp4/ui'
import { useTheme, Select, Typography, useTranslation } from '@okp4/ui'
import classNames from 'classnames'

type ExploreFiltersProps = {
  readonly filters: string[]
  readonly filtersOptions: SelectOption[]
  readonly onFiltersChange: (values: SelectValue) => void
}

const ExploreFilters = ({
  filters,
  filtersOptions,
  onFiltersChange
}: DeepReadonly<ExploreFiltersProps>): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()
  const { theme }: ThemeContextType = useTheme()
  const handleChange = useCallback(
    (selected: DeepReadonly<SelectValue>) => {
      onFiltersChange(selected)
    },
    [onFiltersChange]
  )

  return (
    <div className={classNames('okp4-explore-filters', theme)}>
      <Typography as="h2">{t('explore:filters:title')}</Typography>
      <div className="okp4-explore-filters-dataspace-select">
        <Select
          fullWidth
          multiple
          onChange={handleChange}
          options={filtersOptions}
          value={filters}
        />
      </div>
    </div>
  )
}

export default ExploreFilters
