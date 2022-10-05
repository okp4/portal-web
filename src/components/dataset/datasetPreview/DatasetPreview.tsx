import { Button, Typography, useTheme, useTranslation } from '@okp4/ui'
import type { DeepReadonly, ThemeContextType, UseTranslationResponse } from '@okp4/ui'
import './datasetPreview.scss'
import type { Dataset } from '../../../types/dataset/Dataset.type'
import React from 'react'
import { formatDate } from '../../../utils'

type DatasetPreviewProps = {
  readonly dataset: Dataset
}

export const DatasetPreview = ({ dataset }: DeepReadonly<DatasetPreviewProps>): JSX.Element => {
  const { theme }: ThemeContextType = useTheme()
  const { t, i18n }: UseTranslationResponse = useTranslation()
  const color = 'inverted-text'

  return (
    <div className="okp4-dataset-preview okp4-portal-card-layout">
      <Typography as="h2" color={color} fontSize="large" fontWeight="bold">
        {dataset.name}
      </Typography>
      <Typography color={color}>{t(`dataset:${dataset.type}`)}</Typography>
      <Typography color={color} fontSize="small">
        {t(`dataset:${dataset.access.toLocaleLowerCase()}`)}
      </Typography>
      <Typography color={color} fontSize="small">
        {dataset.categories
          .map((category: string): string => {
            const translation: string = t(`dataset:categories:${category}`)

            return translation !== `dataset:categories:${category}` ? translation : category
          })
          .join(', ')}
      </Typography>
      <Typography color={color} fontSize="x-small">
        {t('dataset:by')} {dataset.provider}, {t('dataset:updated-on')}{' '}
        {formatDate(dataset.updatedOn, i18n.language)}
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
