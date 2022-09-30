import { Button, Icon, Typography, useTheme, useTranslation } from '@okp4/ui'
import type { DeepReadonly, ThemeContextType, UseTranslationResponse } from '@okp4/ui'
import type { Dataverse } from '../../../types/dataverse/Dataverse.type'
import './dataverseInformation.scss'
import { formatDate } from '../../../utils/formatDate'
import Image from 'next/image'

type DataverseInformationProps = {
  readonly dataverse: Dataverse
}

type BackgroundImageProps = {
  readonly url: string
}

type ContainerProps = {
  readonly children: React.ReactNode
  readonly name: string
  readonly theme: string
}

type GovernanceProps = {
  readonly governance: string
}

type MetadataProps = {
  readonly dataverse: Dataverse
  readonly theme: string
}

type Metadata = {
  readonly size: number
  readonly format: string
  readonly quality: number
  readonly completude: number
  readonly provider: string
  readonly updatedAt: string
}

type MetadataRowProps = {
  readonly children: React.ReactNode
  readonly name: string
  readonly unit?: string
}

const BackgroundImage = ({ url }: DeepReadonly<BackgroundImageProps>): JSX.Element => (
  <div className="okp4-dataverse-background-image">
    <Image alt="dataverse_main_picture" layout="fill" objectFit="cover" src={url} />
  </div>
)

const Container = ({ children, name, theme }: DeepReadonly<ContainerProps>): JSX.Element => (
  <div className={`okp4-dataverse-information-container ${theme}`}>
    <Typography as="h2" color="inverted-text" fontSize="small" fontWeight="bold">
      {name}:
    </Typography>
    {children}
  </div>
)

const Governance = ({ governance }: DeepReadonly<GovernanceProps>): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()

  return (
    <div className="okp4-dataverse-governance">
      <Typography as="p" fontSize="small">
        {`${governance} ${t('governance:based')}`}
      </Typography>
      <Button label={t('governance:view')} />
    </div>
  )
}

const MetadataRow = ({ children, name, unit }: DeepReadonly<MetadataRowProps>): JSX.Element => (
  <div className="okp4-dataverse-metadata-row">
    <div className="name">
      <Typography fontSize="small">{name}</Typography>
    </div>
    <div className="value">
      {children}
      {unit && <Typography fontSize="small">{unit}</Typography>}
    </div>
  </div>
)

const Metadata = ({ dataverse, theme }: DeepReadonly<MetadataProps>): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()
  const { size, format, quality, completude, provider, updatedAt }: Metadata = dataverse

  return (
    <div className="okp4-dataverse-metadata">
      <MetadataRow name={t('dataverse:size')} unit="Mo">
        <Typography fontSize="small">{size.toString()}</Typography>
      </MetadataRow>
      <MetadataRow name={t('dataverse:format')}>
        <Typography fontSize="small">{format.toString().toLocaleUpperCase()}</Typography>
      </MetadataRow>
      <MetadataRow name={t('dataverse:quality')}>
        {Array.from(Array(5).keys()).map((arrayValue: number) => (
          // NEED TO ADD THE STAR ICON IN THE LIB
          // NEED TO ADD THE COLOR EDITION IN THE LIB
          <Icon
            className={arrayValue <= quality - 1 ? 'filled' : 'empty'}
            invertColor={theme === 'light'}
            key={arrayValue}
            name="sun"
          />
        ))}
      </MetadataRow>
      <MetadataRow name={t('dataverse:completude')} unit="%">
        <Typography fontSize="small">{completude.toString()}</Typography>
      </MetadataRow>
      <MetadataRow name={t('dataverse:provider')}>
        <Typography fontSize="small">{provider}</Typography>
      </MetadataRow>
      <MetadataRow name={t('dataverse:updatedAt')}>
        <Typography fontSize="small">{formatDate(updatedAt)}</Typography>
      </MetadataRow>
    </div>
  )
}

const DataverseInformation = ({
  dataverse
}: DeepReadonly<DataverseInformationProps>): JSX.Element => {
  const { theme }: ThemeContextType = useTheme()
  const { t }: UseTranslationResponse = useTranslation()

  return (
    <div className="okp4-dataverse-information">
      <BackgroundImage url={dataverse.mainPicture} />
      <div className="okp4-portal-card">
        <Container name={t('dataverse:description')} theme={theme}>
          <Typography as="p" fontSize="small">
            {dataverse.description}
          </Typography>
        </Container>
        <Container name={t('governance:name')} theme={theme}>
          <Governance governance={dataverse.governance} />
        </Container>
        <Container name={t('dataverse:metadata')} theme={theme}>
          <Metadata dataverse={dataverse} theme={theme} />
        </Container>
      </div>
    </div>
  )
}

export default DataverseInformation
