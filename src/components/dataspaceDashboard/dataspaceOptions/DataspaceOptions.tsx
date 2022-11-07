import { useTranslation, Typography, Button, Icon, useMediaType } from '@okp4/ui'
import type { DeepReadonly, UseTranslationResponse } from '@okp4/ui'

type OptionText = {
  title: string
  datasetButton: string
  dashboardButton: string
  serviceButton: string
  reportButton: string
}

const dataspaceOptionsTexts: OptionText[] = [
  {
    title: 'add',
    datasetButton: 'new-dataset',
    dashboardButton: 'new-dashboard',
    serviceButton: 'new-service',
    reportButton: 'new-report'
  },
  {
    title: 'visualize',
    datasetButton: 'datasets',
    dashboardButton: 'dashboards',
    serviceButton: 'services',
    reportButton: 'reports'
  }
]

const DataspaceOptions = (): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()
  const isMobileScreen = useMediaType('(max-width: 480px)')

  return (
    <div className="okp4-dashboard-dataspace-options">
      {dataspaceOptionsTexts.map((optionsText: DeepReadonly<OptionText>) => {
        const { title, datasetButton, dashboardButton, serviceButton, reportButton }: OptionText =
          optionsText
        const buttonsLabels = [datasetButton, dashboardButton, serviceButton, reportButton]

        return (
          <div className={`okp4-dashboard-data ${title}`} key={title}>
            <Typography fontSize="small" fontWeight="bold">
              {t(`dashboard:dataspace:options:${title}`)}
            </Typography>
            {buttonsLabels.map((buttonLabel: string) => (
              <Button
                backgroundColor="primary"
                key={buttonLabel}
                label={t(`dashboard:dataspace:options:${buttonLabel}`)}
                rightIcon={<Icon name="add" size={15} />}
                size={isMobileScreen ? 'small' : 'medium'}
              />
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default DataspaceOptions
