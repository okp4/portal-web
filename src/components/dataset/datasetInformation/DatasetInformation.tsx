import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button, Icon, Typography, useTheme, useTranslation } from '@okp4/ui'
import type { DeepReadonly, ThemeContextType, UseState, UseTranslationResponse } from '@okp4/ui'
import { formatBytes, formatDate } from '../../../utils'
import type { DatasetDto } from '../../../dto/DatasetDto'
import type { DataspaceDto } from '../../../dto/DataspaceDto'
import { Graphviz } from 'graphviz-react'

type DatasetInformationProps = {
  readonly dataset: DatasetDto
  readonly dataspace: DataspaceDto | null
}

type ContainerProps = {
  readonly children: React.ReactNode
  readonly name: string
}

type GovernanceProps = {
  readonly name: string
  readonly theme: string
  readonly token: string
}

type MetadataProps = {
  readonly dataset: DatasetDto
  readonly theme: string
}

type MetadataRowProps = {
  readonly children: React.ReactNode
  readonly name: string
  readonly unit?: string
}

type KnowledgeGraphProps = {
  readonly dataset: DatasetDto
  readonly theme: string
}

const BackgroundImage = ({ url }: DeepReadonly<{ url: string }>): JSX.Element => (
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

const Governance = ({ name, theme, token }: DeepReadonly<GovernanceProps>): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()

  return (
    <div className="okp4-dataset-governance">
      <Typography as="p" color="inverted-text" fontSize="small">
        {t('dataset:governance:based', { name: name, token: token })}
      </Typography>
      <Button
        // TODO: Should be removed with the next design system evolution of the okp4/ui
        backgroundColor={theme === 'dark' ? 'secondary' : 'primary'}
        label={t('dataset:governance:view')}
      />
    </div>
  )
}

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
  const { size, format, quality, completude, provider, updatedOn }: DeepReadonly<DatasetDto> =
    dataset

  return (
    <div className={`okp4-dataset-metadata ${theme}`}>
      <MetadataRow name={t('dataset:size')}>
        <Typography color="inverted-text" fontSize="small">
          {formatBytes(size)}
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
          {completude}
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

const KnowledgeGraph = ({ dataset }: DeepReadonly<KnowledgeGraphProps>): JSX.Element => {
  const { knowledge_graph }: DeepReadonly<DatasetDto> = dataset
  const [dot, setDot]: UseState<DatasetDto['knowledge_graph']> =
    useState<DatasetDto['knowledge_graph']>()

  useEffect(() => {
    if (knowledge_graph) {
      fetch(`/graphs/${knowledge_graph}`)
        // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
        .then(async (resp: Response) => {
          return resp.text()
        })
        .then(setDot)
        .catch((error: unknown) => console.error(error))
    }
  }, [knowledge_graph])

  return (
    <div>
      {dot && (
        <Graphviz
          dot={dot}
          options={{
            width: '150%',
            height: '100%'
          }}
        />
      )}
    </div>
  )
}

const DatasetInformation = ({
  dataset,
  dataspace
}: DeepReadonly<DatasetInformationProps>): JSX.Element => {
  const { theme }: ThemeContextType = useTheme()
  const { t }: UseTranslationResponse = useTranslation()
  const { knowledge_graph }: DeepReadonly<DatasetDto> = dataset

  return (
    <div className="okp4-dataset-information">
      <BackgroundImage url={dataset.mainPicture} />
      <div className="okp4-dataset-information-content">
        <Container name={t('dataset:description')}>
          <Typography as="p" color="inverted-text" fontSize="small">
            {dataset.description}
          </Typography>
        </Container>
        {dataspace && (
          <Container name={t('dataset:governance:name')}>
            <Governance name={dataspace.name} theme={theme} token={dataspace.token} />
          </Container>
        )}
        <Container name={t('dataset:metadata')}>
          <Metadata dataset={dataset} theme={theme} />
        </Container>
      </div>
      {knowledge_graph && (
        <div className="okp4-dataset-information-knowledge-graph-container">
          <Container name={t('dataset:knowledge-graph')}>
            <div className="okp4-dataset-information-knowledge-graph-wrapper">
              <KnowledgeGraph dataset={dataset} theme={theme} />
            </div>
          </Container>
        </div>
      )}
    </div>
  )
}

export default DatasetInformation
