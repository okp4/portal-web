import Image from 'next/image'
import { Button, Icon, Typography, useTheme, useTranslation } from '@okp4/ui'
import type { DeepReadonly, ThemeContextType, UseTranslationResponse } from '@okp4/ui'
import './datasetInformation.scss'
import { formatDate } from '../../../utils'
import type {
  Dataset,
  DatasetGovernance
} from '../../../pages/dataspace/[dataspaceId]/dataset/[datasetId]'
import type { TFunction } from 'react-i18next'

type DatasetInformationProps = {
  readonly dataset: Dataset
}

type BackgroundImageProps = {
  readonly url: string
}

type ContainerProps = {
  readonly children: React.ReactNode
  readonly name: string
}

type GovernanceProps = {
  readonly governance: DatasetGovernance
  readonly theme: string
  readonly t: TFunction
}

type MetadataProps = {
  readonly dataset: Dataset
  readonly theme: string
}

type Metadata = {
  readonly size: number
  readonly format: string
  readonly quality: number
  readonly completeness: number
  readonly provider: string
  readonly updatedOn: string
}

type MetadataRowProps = {
  readonly children: React.ReactNode
  readonly name: string
  readonly unit?: string
}

const BackgroundImage = ({ url }: DeepReadonly<BackgroundImageProps>): JSX.Element => (
  <div className="okp4-dataset-background-image">
    <Image alt="dataset background image" layout="fill" objectFit="cover" src={url} />
  </div>
)

const Container = ({ children, name }: DeepReadonly<ContainerProps>): JSX.Element => (
  <div className="okp4-dataset-information-container">
    <Typography as="h2" color="inverted-text" fontSize="small" fontWeight="bold">
      {name}:
    </Typography>
    {children}
  </div>
)

const Governance = ({ governance, theme, t }: DeepReadonly<GovernanceProps>): JSX.Element => (
  <div className="okp4-dataset-governance">
    <Typography as="p" color="inverted-text" fontSize="small">
      {t('dataset:governance:based', { name: governance.name, token: governance.based })}
    </Typography>
    <Button
      backgroundColor={theme === 'dark' ? 'secondary' : 'primary'}
      label={t('dataset:governance:view')}
    />
  </div>
)

const MetadataRow = ({ children, name, unit }: DeepReadonly<MetadataRowProps>): JSX.Element => (
  <div className="okp4-dataset-metadata-row">
    <div className="okp4-dataset-metadata-row-name">
      <Typography color="inverted-text" fontSize="small">
        {name}
      </Typography>
    </div>
    <div className="okp4-dataset-metadata-row-value">
      {children}
      {unit && (
        <Typography color="inverted-text" fontSize="small">
          {unit}
        </Typography>
      )}
    </div>
  </div>
)

const Metadata = ({ dataset, theme }: DeepReadonly<MetadataProps>): JSX.Element => {
  const { t, i18n }: UseTranslationResponse = useTranslation()
  const { size, format, quality, completeness, provider, updatedOn }: Metadata = dataset

  return (
    <div className={`okp4-dataset-metadata ${theme}`}>
      <MetadataRow name={t('dataset:size')} unit={t('dataset:units:mb')}>
        <Typography color="inverted-text" fontSize="small">
          {size.toString()}
        </Typography>
      </MetadataRow>
      <MetadataRow name={t('dataset:format')}>
        <Typography color="inverted-text" fontSize="small">
          {format.toString().toLocaleUpperCase()}
        </Typography>
      </MetadataRow>
      <MetadataRow name={t('dataset:quality')}>
        {Array.from(Array(5).keys()).map((arrayValue: number) => (
          <Icon
            className={arrayValue <= quality - 1 ? 'filled' : 'empty'}
            key={arrayValue}
            name="sun"
          />
        ))}
      </MetadataRow>
      <MetadataRow name={t('dataset:completeness')} unit="%">
        <Typography color="inverted-text" fontSize="small">
          {completeness.toString()}
        </Typography>
      </MetadataRow>
      <MetadataRow name={t('dataset:provider')}>
        <Typography color="inverted-text" fontSize="small">
          {provider}
        </Typography>
      </MetadataRow>
      <MetadataRow name={t('dataset:updated-on')}>
        <Typography color="inverted-text" fontSize="small">
          {formatDate(updatedOn, i18n.language)}
        </Typography>
      </MetadataRow>
    </div>
  )
}

const DatasetInformation = ({ dataset }: DeepReadonly<DatasetInformationProps>): JSX.Element => {
  const { theme }: ThemeContextType = useTheme()
  const { t }: UseTranslationResponse = useTranslation()

  return (
    <div className="okp4-dataset-information">
      <BackgroundImage url={dataset.mainPicture} />
      <div className="okp4-dataset-information-content">
        <Container name={t('dataset:description')}>
          <Typography as="p" color="inverted-text" fontSize="small">
            {dataset.description}
          </Typography>
        </Container>
        <Container name={t('dataset:governance:name')}>
          <Governance governance={dataset.governance} t={t} theme={theme} />
        </Container>
        <Container name={t('dataset:metadata')}>
          <Metadata dataset={dataset} theme={theme} />
        </Container>
      </div>
    </div>
  )
}

export default DatasetInformation
