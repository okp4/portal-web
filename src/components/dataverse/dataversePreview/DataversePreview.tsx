import { Button, Typography, useTheme, useTranslation } from '@okp4/ui'
import type { DeepReadonly, ThemeContextType, UseTranslationResponse } from '@okp4/ui'
import './dataversePreview.scss'
import type { Dataverse } from '../../../types/dataverse/Dataverse.type'
import { useMemo } from 'react'
import { formatDate } from '../../../utils/formatDate'

type DataversePreviewProps = {
  readonly dataverse: Dataverse
}

export const DataversePreview = ({
  dataverse
}: DeepReadonly<DataversePreviewProps>): JSX.Element => {
  const { theme }: ThemeContextType = useTheme()
  const { t }: UseTranslationResponse = useTranslation()
  const color = useMemo(() => (theme === 'light' ? 'text' : 'inverted-text'), [theme])

  return (
    <div className="okp4-dataverse-preview okp4-portal-card">
      <Typography as="h2" color={color} fontSize="large" fontWeight="bold">
        {dataverse.name}
      </Typography>
      <Typography color={color}>{dataverse.type}</Typography>
      <Typography color={color} fontSize="small">
        {t(`dataverse:${dataverse.access.toLocaleLowerCase()}`)}
      </Typography>
      <Typography color={color} fontSize="small">
        {dataverse.categories.join(', ')}
      </Typography>
      <Typography color={color} fontSize="x-small">{`${t('dataverse:by')} ${dataverse.provider}, ${t(
        'dataverse:updatedAt'
      )} ${formatDate(dataverse.updatedAt)}`}</Typography>
      <Button
        backgroundColor="secondary"
        label={`${t('dataverse:addThis')} ${t(`dataverse:${dataverse.type}`)} ${t(
          'dataverse:toDataspace'
        )}`}
        size="large"
      />
    </div>
  )
}

export default DataversePreview
