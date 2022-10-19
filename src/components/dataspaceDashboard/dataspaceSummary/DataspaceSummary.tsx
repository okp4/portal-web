import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Card, Select, Typography, useMediaType, useTranslation } from '@okp4/ui'
import type {
  DeepReadonly,
  SelectOption,
  SelectValue,
  UseState,
  UseTranslationResponse
} from '@okp4/ui'
import type { DataspaceEntity } from '../dataspaceEntities/DataspaceEntities'
import './dataspaceSummary.scss'

type DataspaceSummaryProps = {
  dataspace: Dataspace
  onDataspaceChange: (value: SelectValue) => void
  governanceUrl: string | null
}

export type Dataspace = {
  datasetsNb: number
  description: string
  entities: DeepReadonly<DataspaceEntity[]>
  id: string
  membersNb: number
  name: string
  servicesNb: number
}

const fetchDataspacesList = async (): Promise<SelectOption[]> => {
  const response = await fetch('/api/fakeData/dataspaces')
  return await response.json()
}

const Counters = ({
  dataspace,
  isMediumScreen
}: DeepReadonly<{ dataspace: Dataspace; isMediumScreen: boolean }>): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()
  const { membersNb, datasetsNb, servicesNb }: Dataspace = dataspace
  const fontSize = useMemo(() => (isMediumScreen ? 'small' : 'medium'), [isMediumScreen])

  return (
    <div className="okp4-dataspace-summary-counters">
      <div className="okp4-dataspace-summary-counter">
        <Typography fontSize={fontSize} fontWeight="bold">
          {membersNb}
        </Typography>
        <Typography fontSize="small">
          {t(`dashboard:dataspace:summary:counters:members`)}
        </Typography>
      </div>
      <div className="okp4-dataspace-summary-counter">
        <Typography fontSize={fontSize} fontWeight="bold">
          {t(`dashboard:dataspace:summary:counters:see`)}
        </Typography>
        <Typography fontSize="small">
          {t(`dashboard:dataspace:summary:counters:rulebook`)}
        </Typography>
      </div>
      <div className="okp4-dataspace-summary-counter">
        <Typography fontSize={fontSize} fontWeight="bold">
          {datasetsNb}
        </Typography>
        <Typography fontSize="small"> {t(`dashboard:dataspace:options:datasets`)}</Typography>
      </div>
      <div className="okp4-dataspace-summary-counter">
        <Typography fontSize={fontSize} fontWeight="bold">
          {servicesNb}
        </Typography>
        <Typography fontSize="small">{t(`dashboard:dataspace:options:services`)}</Typography>
      </div>
    </div>
  )
}

// eslint-disable-next-line max-lines-per-function
const DataspaceSummary = ({
  dataspace,
  governanceUrl,
  onDataspaceChange
}: DeepReadonly<DataspaceSummaryProps>): JSX.Element => {
  const router = useRouter()
  const { t }: UseTranslationResponse = useTranslation()
  const [dataspacesList, setDataspacesList]: UseState<SelectOption[]> = useState<SelectOption[]>([])
  const isMediumScreen = useMediaType('(max-width: 995px)')
  const isXSmallScreen = useMediaType('(max-width: 700px)')

  const navigateToGovernance = useCallback(() => {
    governanceUrl && router.push(governanceUrl)
  }, [governanceUrl, router])

  useEffect(() => {
    fetchDataspacesList()
      .then(setDataspacesList)
      .catch((error: unknown) => console.error(error))
  }, [])

  return (
    <>
      <div className="okp4-dashboard-dataspace-summary">
        <div className="okp4-dataspace-summary-card">
          <Card size={isMediumScreen ? 'medium' : 'small'} />
        </div>
        <Counters dataspace={dataspace} isMediumScreen={isMediumScreen} />
        <div className="okp4-dataspace-selection-with-description">
          <div className="okp4-dataspace-selection">
            <Select
              fullWidth={isXSmallScreen}
              onChange={onDataspaceChange}
              options={dataspacesList}
              value={dataspace.id}
            />
          </div>
          <div className="okp4-dataspace-description">
            <Typography fontSize="small">{dataspace.description}</Typography>
          </div>
        </div>
      </div>
      <div className="okp4-dashboard-governance-link">
        <Button
          disabled={!governanceUrl}
          label={t(`dashboard:dataspace:governance`, { dataspace: dataspace.name })}
          onClick={navigateToGovernance}
        />
      </div>
    </>
  )
}

export default DataspaceSummary
