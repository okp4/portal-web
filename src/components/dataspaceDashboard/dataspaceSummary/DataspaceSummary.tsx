import { useEffect, useMemo, useState } from 'react'
import { Button, Card, Icon, Select, Typography, useMediaType, useTranslation } from '@okp4/ui'
import type {
  DeepReadonly,
  SelectOption,
  SelectValue,
  UseState,
  UseTranslationResponse
} from '@okp4/ui'
import type { DataspaceEntity } from '../dataspaceEntities/DataspaceEntities'
import './dataspaceSummary.scss'
import Link from 'next/link'

export type Dataspace = {
  datasetsNb: number
  description: string
  entities: DeepReadonly<DataspaceEntity[]>
  id: string
  membersNb: number
  name: string
  servicesNb: number
}

const governanceLink =
  'https://xd.adobe.com/view/31a3d2a5-9f07-4e31-a612-20059ff929a5-64f0/screen/d8a45cb1-7433-40b3-b6ce-4237bfcd0678/?fullscreen'

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
  onDataspaceChange
}: DeepReadonly<{
  dataspace: Dataspace
  onDataspaceChange: (value: SelectValue) => void
}>): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()
  const [dataspacesList, setDataspacesList]: UseState<SelectOption[]> = useState<SelectOption[]>([])
  const isMediumScreen = useMediaType('(max-width: 995px)')

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
        <div className="okp4-dataspace-options-with-description">
          <div className="okp4-dataspace-options">
            <Select onChange={onDataspaceChange} options={dataspacesList} value={dataspace.id} />
            <Button
              backgroundColor="primary"
              label={t(`dashboard:dataspace:creation`)}
              leftIcon={<Icon name="add" size={15} />}
              size="small"
            />
          </div>
          <div className="okp4-dataspace-description">
            <Typography fontSize="small">{dataspace.description}</Typography>
          </div>
        </div>
      </div>
      <div className="okp4-dashboard-governance-link">
        <Link href={governanceLink}>
          <Button label={t(`dashboard:dataspace:governance`, { dataspace: dataspace.name })} />
        </Link>
      </div>
    </>
  )
}

export default DataspaceSummary
