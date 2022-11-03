import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import { Button, Card, Icon, Select, Typography, useMediaType, useTranslation } from '@okp4/ui'
import type { DeepReadonly, SelectOption, SelectValue, UseTranslationResponse } from '@okp4/ui'
import './dataspaceSummary.scss'
import type { DataspaceDto } from '../../../dto/DataspaceDto'

type DataspaceSummaryProps = {
  selectedDataspace: DataspaceDto
  dataspaces: DataspaceDto[]
  onDataspaceChange: (value: SelectValue) => void
}

const Counters = ({
  dataspace,
  isMediumScreen
}: DeepReadonly<{ dataspace: DataspaceDto; isMediumScreen: boolean }>): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()
  const { members, datasets, services }: DeepReadonly<DataspaceDto> = dataspace
  const fontSize = useMemo(() => (isMediumScreen ? 'small' : 'medium'), [isMediumScreen])

  return (
    <div className="okp4-dataspace-summary-counters">
      <div className="okp4-dataspace-summary-counter">
        <Typography fontSize={fontSize} fontWeight="bold">
          {members}
        </Typography>
        <Typography fontSize="small">
          {t('dashboard:dataspace:summary:counters:members')}
        </Typography>
      </div>
      <div className="okp4-dataspace-summary-counter">
        <Typography fontSize={fontSize} fontWeight="bold">
          {t('dashboard:dataspace:summary:counters:see')}
        </Typography>
        <Typography fontSize="small">
          {t('dashboard:dataspace:summary:counters:rulebook')}
        </Typography>
      </div>
      <div className="okp4-dataspace-summary-counter">
        <Typography fontSize={fontSize} fontWeight="bold">
          {datasets}
        </Typography>
        <Typography fontSize="small"> {t('dashboard:dataspace:options:datasets')}</Typography>
      </div>
      <div className="okp4-dataspace-summary-counter">
        <Typography fontSize={fontSize} fontWeight="bold">
          {services}
        </Typography>
        <Typography fontSize="small">{t('dashboard:dataspace:options:services')}</Typography>
      </div>
    </div>
  )
}

// eslint-disable-next-line max-lines-per-function
const DataspaceSummary = ({
  selectedDataspace,
  dataspaces,
  onDataspaceChange
}: DeepReadonly<DataspaceSummaryProps>): JSX.Element => {
  const router = useRouter()
  const { t }: UseTranslationResponse = useTranslation()
  const isMediumScreen = useMediaType('(max-width: 995px)')

  const dataspacesList = useMemo(
    () =>
      dataspaces.map(
        (item: DeepReadonly<DataspaceDto>): SelectOption => ({ label: item.name, value: item.id })
      ),
    [dataspaces]
  )

  const navigateToGovernance = useCallback(() => {
    selectedDataspace.governanceUrl && router.push(selectedDataspace.governanceUrl)
  }, [selectedDataspace.governanceUrl, router])

  return (
    <>
      <div className="okp4-dashboard-dataspace-summary">
        <div className="okp4-dataspace-summary-card">
          <Card size={isMediumScreen ? 'medium' : 'small'} />
        </div>
        <Counters dataspace={selectedDataspace} isMediumScreen={isMediumScreen} />
        <div className="okp4-dataspace-options-with-description">
          <div className="okp4-dataspace-options">
            <Select onChange={onDataspaceChange} options={dataspacesList} value={selectedDataspace.id} />
            <Button
              backgroundColor="primary"
              label={t('dashboard:dataspace:creation')}
              leftIcon={<Icon name="add" size={15} />}
              size="small"
            />
          </div>
          <div className="okp4-dataspace-description">
            <Typography fontSize="small">
              {t(
                `dashboard:dataspace:description:${selectedDataspace.name.toLowerCase().replace(/ /g, '-')}`
              )}
            </Typography>
          </div>
        </div>
      </div>
      <div className="okp4-dashboard-governance-link">
        <Button
          disabled={!selectedDataspace.governanceUrl}
          label={t(`dashboard:dataspace:governance`, { dataspace: selectedDataspace.name })}
          onClick={navigateToGovernance}
        />
      </div>
    </>
  )
}

export default DataspaceSummary
