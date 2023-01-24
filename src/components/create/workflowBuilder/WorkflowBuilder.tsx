import { Button, Icon, Select, TextField, Typography, useTranslation } from '@okp4/ui'
import type { DeepReadonly, UseState, UseTranslationResponse } from '@okp4/ui'
import { useCallback, useMemo, useState } from 'react'
import type { ChangeEvent } from 'react'
import classNames from 'classnames'
import type { DatasetDto } from '../../../dto/DatasetDto'
import type { ServiceDto } from '../../../dto/ServiceDto'

type WorkflowBuilderProps = {
  datasets: DatasetDto[]
  services: ServiceDto[]
}

type DataInputValue = null | string
type MetaDataInputValue = null | string

type DataInput = {
  dataset1: DataInputValue
  dataset2: DataInputValue
  service: DataInputValue
}

type MetaDataInput = {
  name: MetaDataInputValue
  description: MetaDataInputValue
  provider: MetaDataInputValue
  categories: MetaDataInputValue | string[]
}

const labelSelectOptions = [
  {
    label: 'open data',
    value: 'open data'
  },
  {
    label: 'france',
    value: 'france'
  },
  {
    label: 'region',
    value: 'region'
  },
  {
    label: 'departement',
    value: 'departement'
  },
  {
    label: 'commune',
    value: 'commune'
  },
  {
    label: 'agriculture',
    value: 'agriculture'
  },
  {
    label: 'sylviculture',
    value: 'sylviculture'
  },
  {
    label: 'pêche',
    value: 'pêche'
  },
  {
    label: 'production animale',
    value: 'production animale'
  },
  {
    label: 'production végétale',
    value: 'production végétale'
  }
]

// eslint-disable-next-line max-lines-per-function
const WorkflowBuilder = ({
  datasets,
  services
}: DeepReadonly<WorkflowBuilderProps>): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()
  const [dataInput, setDataInput]: UseState<DataInput> = useState<DataInput>({
    dataset1: null,
    dataset2: null,
    service: null
  })
  const [metaDataInput, setMetaDataInput]: UseState<MetaDataInput> = useState<MetaDataInput>({
    name: null,
    description: null,
    provider: null,
    categories: null
  })

  const datasetOptions = useMemo(
    () =>
      datasets.map(({ id, name }: DeepReadonly<DatasetDto>) => ({
        label: name,
        value: id
      })),
    [datasets]
  )

  const handleMetaDataChange = useCallback(
    (id: string) => {
      switch (id) {
        case 'name':
          return (
            // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
            event: DeepReadonly<ChangeEvent<HTMLInputElement | HTMLTextAreaElement>>
          ) => {
            setMetaDataInput({ ...metaDataInput, name: event.target.value })
          }

        case 'description':
          return (
            // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
            event: DeepReadonly<ChangeEvent<HTMLInputElement | HTMLTextAreaElement>>
          ) => {
            setMetaDataInput({ ...metaDataInput, description: event.target.value })
          }
        case 'provider':
          return (
            // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
            event: DeepReadonly<ChangeEvent<HTMLInputElement | HTMLTextAreaElement>>
          ) => {
            setMetaDataInput({ ...metaDataInput, provider: event.target.value })
          }
        default:
          console.error('Meta data could not be updated')
          break
      }
    },
    [metaDataInput]
  )

  const handleLabelsChange = useCallback(
    (value: string | readonly string[]) => {
      setMetaDataInput({ ...metaDataInput, categories: value as string[] })
    },
    [metaDataInput]
  )

  const handleDataChange = useCallback(
    (selectName: string) => (value: string | readonly string[]) => {
      const selectValue = value as string
      switch (selectName) {
        case 'dataset1':
          setDataInput({ ...dataInput, dataset1: selectValue })
          break
        case 'dataset2':
          setDataInput({ ...dataInput, dataset2: selectValue })
          break
        case 'service':
          setDataInput({ ...dataInput, service: selectValue })
          break
      }
    },
    [dataInput]
  )

  const serviceSelectOptions = useMemo(
    () =>
      services.map(({ id, name }: DeepReadonly<ServiceDto>) => ({
        label: name,
        value: id
      })),
    [services]
  )

  const metaDataTextfields = useMemo(
    () => [
      {
        id: 'name',
        value: metaDataInput.name
      },
      {
        id: 'description',
        value: metaDataInput.description
      },
      {
        id: 'provider',
        value: metaDataInput.provider
      }
    ],
    [metaDataInput]
  )

  const isDataComplete = useMemo(
    () => Object.values(dataInput).every((value: string | readonly string[] | null) => value),
    [dataInput]
  )

  const isMetaDataComplete = useMemo(
    () =>
      Object.values(metaDataInput).every(
        (value: DeepReadonly<string | string[] | null>) => value?.length
      ),
    [metaDataInput]
  )

  return (
    <div className="okp4-workflow-builder-main">
      <div className="okp4-workflow-builder-composer">
        <Typography as="h2" color="inverted-text" fontSize="small" fontWeight="bold">
          {t('create:composer:title')}
        </Typography>
        <div>
          <Typography as="p" color="inverted-text" fontSize="small">
            {t('create:composer:datasets:description')}
          </Typography>
          <Select
            fullWidth
            onChange={handleDataChange('dataset1')}
            options={[datasetOptions[0]]}
            placeholder={t('create:composer:datasets:placeholder1')}
            value={dataInput.dataset1 ?? ''}
          />
          <Select
            fullWidth
            onChange={handleDataChange('dataset2')}
            options={[datasetOptions[1]]}
            placeholder={t('create:composer:datasets:placeholder2')}
            value={dataInput.dataset2 ?? ''}
          />
        </div>
        <div>
          <Typography as="p" color="inverted-text" fontSize="small">
            {t('create:composer:service:description')}
          </Typography>
          <Select
            fullWidth
            onChange={handleDataChange('service')}
            options={serviceSelectOptions}
            placeholder={t('create:composer:service:placeholder')}
            value={dataInput.service ?? ''}
          />
        </div>
      </div>
      <div className="okp4-workflow-builder-meta-data">
        <div>
          <Typography as="h2" color="inverted-text" fontSize="small" fontWeight="bold">
            {t('create:metaData:title')}
          </Typography>
        </div>
        {metaDataTextfields.map(
          ({ id, value }: DeepReadonly<{ id: string; value: string | null }>, index: number) => (
            <div
              className={classNames('okp4-workflow-builder-meta-data-text-field', {
                disabled: !isDataComplete
              })}
              key={index}
            >
              <TextField
                disabled={!isDataComplete}
                fullWidth
                hasError={value === null ? false : !value}
                multiline={id === 'description'}
                onChange={handleMetaDataChange(id)}
                placeholder={`${t(`create:metaData:fields:${id}:placeholder`)}*`}
                value={value ?? ''}
                withBorder
              />
            </div>
          )
        )}
        <Select
          disabled={!isDataComplete}
          fullWidth
          hasError={metaDataInput.categories === null ? false : !metaDataInput.categories.length}
          multiple
          onChange={handleLabelsChange}
          options={labelSelectOptions}
          placeholder={`${t('create:metaData:fields:labels:placeholder')}*`}
          value={metaDataInput.categories ?? ''}
        />
        <div
          className={classNames('okp4-workflow-builder-meta-data-submit', {
            'button-only': !isMetaDataComplete
          })}
        >
          {isMetaDataComplete && (
            <div
              className={classNames('okp4-workflow-builder-meta-data-submit-message', 'success')}
            >
              <div>
                <Icon invertColor name="check" size={16} />
              </div>
              <Typography as="p" color="inverted-text" fontSize="small">
                {t('create:metaData:submit:message:success')}
              </Typography>
            </div>
          )}
          <div className="okp4-workflow-builder-meta-data-submit-button">
            <Button
              backgroundColor="secondary"
              disabled={!isMetaDataComplete}
              label={t('create:metaData:submit:button')}
              variant="secondary"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkflowBuilder
