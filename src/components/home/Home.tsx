import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Card, Icon, Select, Typography, useMediaType, useTranslation } from '@okp4/ui'
import type {
  DeepReadonly,
  SelectOption,
  SelectValue,
  UseState,
  UseTranslationResponse
} from '@okp4/ui'
import './home.scss'

type DataspaceEntity = {
  label: string
  type: string
}

type Dataspace = {
  datasetsNb: number
  description: string
  entities: DeepReadonly<DataspaceEntity[]>
  id: string
  membersNb: number
  name: string
  servicesNb: number
}

type OptionText = {
  title: string
  datasetButton: string
  dahsboardButton: string
  serviceButton: string
  reportButton: string
}

const dataspaceOptionsTexts: OptionText[] = [
  {
    title: 'add',
    datasetButton: 'new-dataset',
    dahsboardButton: 'new-dashboard',
    serviceButton: 'new-service',
    reportButton: 'new-report'
  },
  {
    title: 'visualize',
    datasetButton: 'datasets',
    dahsboardButton: 'dashboards',
    serviceButton: 'services',
    reportButton: 'reports'
  }
]

const DataspaceEntities = ({
  entities
}: DeepReadonly<{ entities: DataspaceEntity[] }>): JSX.Element => {
  return (
    <>
      {entities.map((entity: DeepReadonly<DataspaceEntity>, index: number) => (
        <div className="okp4-dataspace-card" key={index}>
          <Card
            footer={
              <div className="okp4-dataspace-card-footer">
                <Typography>{entity.label}</Typography>
              </div>
            }
            header={
              <div className="okp4-dataspace-card-header">
                <Typography>{entity.type}</Typography>
              </div>
            }
          />
        </div>
      ))}
    </>
  )
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
          {t(`home:dashboard:dataspace:summary:counters:members`)}
        </Typography>
      </div>
      <div className="okp4-dataspace-summary-counter">
        <Typography fontSize={fontSize} fontWeight="bold">
          {t(`home:dashboard:dataspace:summary:counters:see`)}
        </Typography>
        <Typography fontSize="small">
          {t(`home:dashboard:dataspace:summary:counters:rulebook`)}
        </Typography>
      </div>
      <div className="okp4-dataspace-summary-counter">
        <Typography fontSize={fontSize} fontWeight="bold">
          {datasetsNb}
        </Typography>
        <Typography fontSize="small"> {t(`home:dashboard:dataspace:options:datasets`)}</Typography>
      </div>
      <div className="okp4-dataspace-summary-counter">
        <Typography fontSize={fontSize} fontWeight="bold">
          {servicesNb}
        </Typography>
        <Typography fontSize="small">{t(`home:dashboard:dataspace:options:services`)}</Typography>
      </div>
    </div>
  )
}

const DataspaceOptions = ({
  isMobileScreen
}: DeepReadonly<{ isMobileScreen: boolean }>): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()
  return (
    <>
      {dataspaceOptionsTexts.map((optionsText: DeepReadonly<OptionText>, index: number) => {
        const { title, datasetButton, dahsboardButton, serviceButton, reportButton }: OptionText =
          optionsText
        const buttonSize = isMobileScreen ? 'small' : 'medium'

        return (
          <div className={`okp4-dashboard-data ${optionsText.title}`} key={index}>
            <Typography fontSize="small" fontWeight="bold">
              {t(`home:dashboard:dataspace:options:${title}`)}
            </Typography>
            <Button
              backgroundColor="primary"
              label={t(`home:dashboard:dataspace:options:${datasetButton}`)}
              rightIcon={<Icon name="add" size={15} />}
              size={buttonSize}
            />
            <Button
              backgroundColor="primary"
              label={t(`home:dashboard:dataspace:options:${dahsboardButton}`)}
              rightIcon={<Icon name="add" size={15} />}
              size={buttonSize}
            />
            <Button
              backgroundColor="primary"
              label={t(`home:dashboard:dataspace:options:${serviceButton}`)}
              rightIcon={<Icon name="add" size={15} />}
              size={buttonSize}
            />
            <Button
              backgroundColor="primary"
              label={t(`home:dashboard:dataspace:options:${reportButton}`)}
              rightIcon={<Icon name="add" size={15} />}
              size={buttonSize}
            />
          </div>
        )
      })}
    </>
  )
}

const fetchDataspace = async (url: string): Promise<Dataspace> => {
  const response = await fetch(url)
  return await response.json()
}

const fetchDataspacesList = async (): Promise<SelectOption[]> => {
  const response = await fetch('/api/fakeData/dataspaces')
  return await response.json()
}

// eslint-disable-next-line max-lines-per-function
export const Home = (): JSX.Element | null => {
  const { t }: UseTranslationResponse = useTranslation()
  const [dataspacesList, setDataspacesList]: UseState<SelectOption[]> = useState<SelectOption[]>([])
  const [dataspace, setDataspace]: UseState<Dataspace | null> = useState<Dataspace | null>(null)
  const isMediumScreen = useMediaType('(max-width: 995px)')
  const isXSmallScreen = useMediaType('(max-width: 700px)')
  const isMobileScreen = useMediaType('(max-width: 480px)')

  const handleDataspaceChange = useCallback((value: SelectValue) => {
    fetchDataspace(`/api/fakeData/dataspaces/${value}`)
      .then(setDataspace)
      .catch((error: unknown) => console.error(error))
  }, [])

  useEffect(() => {
    fetchDataspacesList()
      .then(setDataspacesList)
      .catch((error: unknown) => console.error(error))
  }, [])

  useEffect(() => {
    fetchDataspace('/api/fakeData/dataspaces/RhizomeId')
      .then(setDataspace)
      .catch((error: unknown) => console.error(error))
  }, [])

  return dataspace ? (
    <div className="okp4-body-main">
      <div className="okp4-body-dashboard">
        <div className="okp4-dashboard-dataspace-summary">
          <div className="okp4-dataspace-summary-card">
            <Card size={isMediumScreen ? 'medium' : 'small'} />
          </div>
          <Counters dataspace={dataspace} isMediumScreen={isMediumScreen} />
          <div className="okp4-dataspace-selection-with-description">
            <div className="okp4-dataspace-selection">
              <Select
                fullWidth={isXSmallScreen}
                onChange={handleDataspaceChange}
                options={dataspacesList}
                value={dataspace.id}
              />
            </div>
            <div className="okp4-dataspace-description">
              <Typography fontSize="small">{dataspace.description}</Typography>
            </div>
          </div>
        </div>
        <div className="okp4-dashboard-dataspace-creation">
          <Button
            backgroundColor="primary"
            label={t(`home:dashboard:dataspace:creation`)}
            leftIcon={<Icon name="add" size={15} />}
            size={isMobileScreen ? 'small' : 'medium'}
          />
        </div>
        <div className="okp4-dashboard-dataspace-content">
          <DataspaceEntities entities={dataspace.entities} />
        </div>
        <div className="okp4-dashboard-dataspace-options">
          <DataspaceOptions isMobileScreen={isMobileScreen} />
        </div>
      </div>
      <div className="okp4-body-activity" />
    </div>
  ) : null
}
