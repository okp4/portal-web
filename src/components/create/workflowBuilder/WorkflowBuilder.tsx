/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Button, Icon, Select, TextField, Toast, Typography, useTranslation } from '@okp4/ui'
import short from 'short-uuid'
import type { DeepReadonly, UseTranslationResponse } from '@okp4/ui'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ChangeEvent } from 'react'
import classNames from 'classnames'
import type { DatasetDto } from '../../../dto/DatasetDto'
import type { ServiceDto } from '../../../dto/ServiceDto'
import { keplrChainConfig } from '../../../chain/keplr'
import { useSendTokens } from '../../../hooks/useSendTokens'
import type { Config } from '../../../pages/api/config'
import type { WorkflowResponse } from '../../../pages/api/dataverse/knowledge/workflow/[id]'

type WorkflowBuilderProps = {
  datasets: DatasetDto[]
  services: ServiceDto[]
  chain: Config['chain']
  transaction: Config['transaction']
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
  categories: string[] | null
}

type WorkflowState = 'idle' | 'txRunning' | 'workflowRunning' | 'datatetUploadRunning' | 'success'

const rhizomeId = 'ef347285-e52a-430d-9679-dcb76b962ce7'

const amountFinal = {
  denom: 'uknow',
  amount: '200000'
}
const fee = {
  amount: [
    {
      denom: 'uknow',
      amount: '5000'
    }
  ],
  gas: '200000'
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

const defaultDataset = {
  mainPicture: 'https://images.unsplash.com/photo-1537721664796-76f77222a5d0',
  access: 'PUBLIC',
  creator: 'OKP4',
  size: 100525124,
  format: 'csv',
  final_dataset: true,
  quality: 4,
  completude: 95
}

const defaultDataInput = {
  dataset1: null,
  dataset2: null,
  service: null
}

const defaultMetadataInput = {
  name: null,
  description: null,
  provider: null,
  categories: null
}

// eslint-disable-next-line max-lines-per-function
const WorkflowBuilder = ({
  datasets,
  services,
  chain,
  transaction
}: DeepReadonly<WorkflowBuilderProps>): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()
  const [pollIntervall, setPollIntervall] = useState<NodeJS.Timer | null>(null)
  const [worflowInfo, setWorkflowInfo] = useState<WorkflowResponse | null>(null)
  const [memoId, setMemoId] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [dataInput, setDataInput] = useState<DataInput>(defaultDataInput)
  const [metaDataInput, setMetaDataInput] = useState<MetaDataInput>(defaultMetadataInput)
  const [workflowState, setWorkflowState] = useState<WorkflowState>('idle')
  const [sendTokens, { data, error, loading }] = useSendTokens({
    chainInfo: keplrChainConfig(chain)
  })

  const clearErrorMessage = useCallback(() => {
    setErrorMessage('')
  }, [])

  const datasetOptions = useMemo(
    () =>
      datasets.map(({ id, name }: DeepReadonly<DatasetDto>) => ({
        label: name,
        value: id
      })),
    [datasets]
  )

  const handleMetaDataChange = useCallback((id: string) => {
    switch (id) {
      case 'name':
        return (event: DeepReadonly<ChangeEvent<HTMLInputElement | HTMLTextAreaElement>>) => {
          setMetaDataInput(prev => ({ ...prev, name: event.target.value }))
        }

      case 'description':
        return (event: DeepReadonly<ChangeEvent<HTMLInputElement | HTMLTextAreaElement>>) => {
          setMetaDataInput(prev => ({ ...prev, description: event.target.value }))
        }
      case 'provider':
        return (event: DeepReadonly<ChangeEvent<HTMLInputElement | HTMLTextAreaElement>>) => {
          setMetaDataInput(prev => ({ ...prev, provider: event.target.value }))
        }
      default:
        console.error('Meta data could not be updated')
        break
    }
  }, [])

  const flushState = useCallback(() => {
    setWorkflowInfo(null)
    setDataInput(defaultDataInput)
    setMetaDataInput(defaultMetadataInput)
  }, [])

  const txMemoId = useCallback(() => {
    const id = short.generate()
    setMemoId(id)
    return id
  }, [])

  const handleTx = useCallback(() => {
    const txMemo = `${transaction.memo}?id=${txMemoId()}`
    sendTokens(transaction.recipientAddress, amountFinal, fee, txMemo)
  }, [sendTokens, transaction.memo, transaction.recipientAddress, txMemoId])

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
          setDataInput(prev => ({ ...prev, dataset1: selectValue }))
          break
        case 'dataset2':
          setDataInput(prev => ({ ...prev, dataset2: selectValue }))
          break
        case 'service':
          setDataInput(prev => ({ ...prev, service: selectValue }))
          break
      }
    },
    []
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

  const resetWorkflowState = useCallback(() => {
    setWorkflowState('idle')
  }, [])

  const clearPollingInterval = useCallback(() => {
    if (pollIntervall) {
      clearInterval(pollIntervall)
      setPollIntervall(null)
    }
  }, [pollIntervall])

  const fetchWorkflow = useCallback(
    async (cb: () => void) => {
      fetch(`/api/dataverse/knowledge/workflow/${memoId}`)
        .then(async (res: DeepReadonly<Response>) => {
          if (res.ok) {
            return res.json()
          }
          throw new Error()
        })
        .then((data: DeepReadonly<WorkflowResponse> | null) => {
          setWorkflowInfo(data)
        })
        .catch((error: unknown) => {
          console.error(error)
          setErrorMessage(
            'Oops.. An error occured while accessing workflow.. Please try again later.'
          )
          setPollIntervall(null)
          setWorkflowState('idle')
          cb()
        })
    },
    [memoId]
  )

  const pollWorkflowInfo = useCallback(() => {
    const interval = setInterval(async () => {
      await fetchWorkflow(() => clearInterval(interval))
    }, 1000)
    setPollIntervall(interval)
    setWorkflowState('workflowRunning')
  }, [fetchWorkflow])

  const uploadDataset = useCallback(async () => {
    setWorkflowState('datatetUploadRunning')
    const { name, description, provider, categories } = metaDataInput
    const now = new Date().toISOString()
    const dataset: Omit<DatasetDto, 'dataspaceId'> = {
      ...defaultDataset,
      type: 'dataset',
      id: short.generate(),
      name: name ?? '',
      description: description ?? '',
      categories: categories ?? [],
      provider: provider ?? '',
      createdOn: now,
      updatedOn: now
    }

    fetch(`/api/dataverse/dataspace/${rhizomeId}/dataset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataset)
    })
      .then((response: DeepReadonly<Response>) => {
        if (response.ok) {
          setWorkflowState('success')
          flushState()
        } else {
          throw new Error()
        }
      })
      .catch((error: unknown) => {
        console.error(error)
        setErrorMessage(
          'Oops.. An error occured while creating knowledge.. Please try again later.'
        )
        setWorkflowState('idle')
        setWorkflowInfo(null)
      })
  }, [flushState, metaDataInput])

  const openWorkflowTab = useCallback(() => {
    worflowInfo?.visualizationUrl && window.open(worflowInfo.visualizationUrl, '_blank')
  }, [worflowInfo?.visualizationUrl])

  useEffect(() => {
    if (data?.txHash) {
      pollWorkflowInfo()
    }
  }, [data?.txHash])

  useEffect(() => {
    if (worflowInfo?.status === 'Failed') {
      setErrorMessage('Oops.. An error occured while executing workflow.. Please try again later.')
      setWorkflowState('idle')
    }
    if (worflowInfo?.status === 'Succeeded') {
      uploadDataset()
    }
  }, [worflowInfo?.status])

  useEffect(() => {
    if (worflowInfo?.status === 'Succeeded') {
      clearPollingInterval()
    }
  }, [worflowInfo?.status])

  useEffect(() => {
    loading && setWorkflowState('txRunning')
  }, [loading])

  useEffect(() => {
    if (error) {
      setErrorMessage(error.message)
      setWorkflowState('idle')
    }
  }, [error])

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
          value={metaDataInput.categories ?? []}
        />
        <div
          className={classNames('okp4-workflow-builder-meta-data-submit', {
            'button-only': !isMetaDataComplete
          })}
        >
          {isMetaDataComplete && workflowState === 'idle' && (
            <div className={'okp4-workflow-builder-meta-data-submit-message'}>
              <div>
                <Icon invertColor name="check" size={16} />
              </div>
              <Typography as="p" color="inverted-text" fontSize="small">
                {t('create:metaData:submit:message:success')}
              </Typography>
            </div>
          )}
          {workflowState !== 'idle' && workflowState !== 'success' && (
            <div className="loader-container">
              <div className="loader" />
              <Typography as="p" color="inverted-text" fontSize="small" fontWeight="bold">
                {t(`create:metaData:submit:workflowState:${workflowState}`)}
              </Typography>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <div className="okp4-workflow-builder-meta-data-submit-button">
              <Button
                backgroundColor="secondary"
                disabled={!isMetaDataComplete || workflowState !== 'idle'}
                label={t('create:metaData:submit:button')}
                onClick={handleTx}
                variant="secondary"
              />
            </div>
            <div className="okp4-workflow-builder-meta-data-submit-button">
              <Button
                backgroundColor="secondary"
                disabled={!worflowInfo?.visualizationUrl}
                label={t('create:metaData:see:workflow')}
                onClick={openWorkflowTab}
                variant="secondary"
              />
            </div>
          </div>
        </div>
      </div>
      <Toast
        autoDuration={4000}
        description={errorMessage}
        isOpened={!!errorMessage}
        onOpenChange={clearErrorMessage}
        severityLevel="error"
        title={'Error'}
      />
      <Toast
        autoDuration={4000}
        description={`${t('create:metaData:submit:workflowState:success')} 🚀`}
        isOpened={workflowState === 'success'}
        onOpenChange={resetWorkflowState}
        severityLevel="success"
      />
    </div>
  )
}

export default WorkflowBuilder
