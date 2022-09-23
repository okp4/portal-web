import { Button, Card, Icon, Select, Typography, useMediaType, useTranslation } from '@okp4/ui'
import type { DeepReadonly, SelectValue, UseTranslationResponse } from '@okp4/ui'
import { useCallback } from 'react'
import './home.scss'

type FakeDataType = {
  header: string
  footer: string
}

const DataspaceElements = (): JSX.Element => {
  const fakeData = [
    { header: 'DataSet', footer: 'Agreste Normé' },
    { header: 'Service', footer: 'Jointure' },
    { header: 'DataSet', footer: 'RPG 2022' }
  ]
  return (
    <>
      {fakeData.map((data: DeepReadonly<FakeDataType>, index: number) => (
        <div className="okp4-dataspace-card" key={index}>
          <Card
            footer={<Typography>{data.footer}</Typography>}
            header={<Typography>{data.header}</Typography>}
          />
        </div>
      ))}
    </>
  )
}

type OptionText = {
  option: string
  title: string
  datasetButton: string
  dahsboardButton: string
  serviceButton: string
  reportButton: string
}

const dataspaceOptionsTexts: OptionText[] = [
  {
    option: 'creation',
    title: 'add',
    datasetButton: 'new-dataset',
    dahsboardButton: 'new-dashboard',
    serviceButton: 'new-service',
    reportButton: 'new-report'
  },
  {
    option: 'visualization',
    title: 'visualize',
    datasetButton: 'datasets',
    dahsboardButton: 'dashboards',
    serviceButton: 'services',
    reportButton: 'reports'
  }
]

  const { t }: UseTranslationResponse = useTranslation()

  return (
          <div className="okp4-dataspace-summary-counters">
            <div className="okp4-dataspace-summary-counter">
              <Typography fontSize={isSmallScreen ? 'small' : 'medium'} fontWeight="bold">
                289
              </Typography>
        <Typography fontSize="small">
          {t(`home:dashboard:dataspace:summary:counters:members`)}
        </Typography>
            </div>
            <div className="okp4-dataspace-summary-counter">
              <Typography fontSize={isSmallScreen ? 'small' : 'medium'} fontWeight="bold">
          {t(`home:dashboard:dataspace:summary:counters:see`)}
              </Typography>
        <Typography fontSize="small">
          {t(`home:dashboard:dataspace:summary:counters:rulebook`)}
        </Typography>
            </div>
            <div className="okp4-dataspace-summary-counter">
              <Typography fontSize={isSmallScreen ? 'small' : 'medium'} fontWeight="bold">
                376
              </Typography>
        <Typography fontSize="small"> {t(`home:dashboard:dataspace:options:datasets`)}</Typography>
            </div>
            <div className="okp4-dataspace-summary-counter">
              <Typography fontSize={isSmallScreen ? 'small' : 'medium'} fontWeight="bold">
                73
              </Typography>
        <Typography fontSize="small">{t(`home:dashboard:dataspace:options:services`)}</Typography>
            </div>
          </div>
  const { t }: UseTranslationResponse = useTranslation()
  return (
            <Typography fontSize="small" fontWeight="bold">
            {t(`home:dashboard:dataspace:options:${optionsText.title}`)}
            </Typography>
            <Button
              backgroundColor="secondary"
            label={t(`home:dashboard:dataspace:options:${optionsText.datasetButton}`)}
              rightIcon={<Icon name="add" size={15} />}
            />
            <Button
              backgroundColor="secondary"
            label={t(`home:dashboard:dataspace:options:${optionsText.dahsboardButton}`)}
              rightIcon={<Icon name="add" size={15} />}
            />
            <Button
              backgroundColor="secondary"
            label={t(`home:dashboard:dataspace:options:${optionsText.serviceButton}`)}
              rightIcon={<Icon name="add" size={15} />}
            />
            <Button
              backgroundColor="secondary"
            label={t(`home:dashboard:dataspace:options:${optionsText.reportButton}`)}
              rightIcon={<Icon name="add" size={15} />}
            />
          </div>
          <div className="okp4-dashboard-data-visualization">
            <Typography fontSize="small" fontWeight="bold">
              Visualize
            </Typography>
            <Button
              backgroundColor="secondary"
              label="Datasets"
              rightIcon={<Icon name="add" size={15} />}
            />
            <Button
              backgroundColor="secondary"
            label={t(`home:dashboard:dataspace:creation`)}
            leftIcon={<Icon name="add" size={15} />}
            />
          </div>
        </div>
      </div>
      <div className="okp4-body-activity">Search bar & Activity</div>
    </div>
  )
}
