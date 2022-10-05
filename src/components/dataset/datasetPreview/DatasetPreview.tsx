import React, { useMemo } from 'react'
import { Button, Typography, useTheme, useTranslation } from '@okp4/ui'
import type { DeepReadonly, ThemeContextType, UseTranslationResponse } from '@okp4/ui'
import './datasetPreview.scss'
import type { Dataset } from '../../../pages/dataspace/[dataspaceId]/dataset/[datasetId]'
import { formatDate } from '../../../utils'

type DatasetPreviewProps = {
  dataset: Dataset
}

export const DatasetPreview = ({ dataset }: DeepReadonly<DatasetPreviewProps>): JSX.Element => {
  const { theme }: ThemeContextType = useTheme()
  const { t, i18n }: UseTranslationResponse = useTranslation()
  const invertedTextColor = 'inverted-text'

  const categoriesAsString: string = useMemo(
    () =>
      dataset.categories
        .map((category: string): string => t(`dataset:categories:${category}`, category))
        .join(', '),
    [t, dataset.categories]
  )

  return (
    <div className={`okp4-dataset-preview ${theme}`}>
      <Typography as="h2" color={invertedTextColor} fontSize="large" fontWeight="bold">
        {dataset.name}
      </Typography>
      <Typography color={invertedTextColor}>{t(`dataset:${dataset.type}`)}</Typography>
      <Typography color={invertedTextColor} fontSize="small">
        {t(`dataset:${dataset.access.toLocaleLowerCase()}`)}
      </Typography>
      <Typography color={invertedTextColor} fontSize="small">
        {categoriesAsString}
      </Typography>
      <Typography color={invertedTextColor} fontSize="x-small">
        {t('dataset:by', {
          provider: dataset.provider,
          updated: formatDate(dataset.updatedOn, i18n.language)
        })}
      </Typography>
      <Button
        backgroundColor={theme === 'dark' ? 'secondary' : 'primary'}
        label={t('dataset:add')}
        size="large"
      />
    </div>
  )
}

export default DatasetPreview
