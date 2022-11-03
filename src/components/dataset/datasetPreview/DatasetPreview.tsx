/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/typedef */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Toast, Typography, useTheme, useTranslation } from '@okp4/ui'
import type { DeepReadonly, ThemeContextType, UseTranslationResponse } from '@okp4/ui'
import './datasetPreview.scss'
import { formatDate } from '../../../utils'
import type { DatasetDto } from '../../../dto/DatasetDto'
import type { UseSendTokensTuple } from '../../../hooks/useSendTokens'
import { useSendTokens } from '../../../hooks/useSendTokens'
import type { NextRouter } from 'next/router'
import { useRouter } from 'next/router'
import { keplrChainConfig } from '../../../chain/keplr'
import type { Config } from '../../../pages/api/config'

type DatasetPreviewProps = {
  dataset: DatasetDto
  chain: Config['chain']
  okp4BiUrl: string
  transaction: Config['transaction']
}

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

export const DatasetPreview = ({
  dataset,
  chain,
  okp4BiUrl,
  transaction
}: DeepReadonly<DatasetPreviewProps>): JSX.Element => {
  const { push }: NextRouter = useRouter()
  const { theme }: ThemeContextType = useTheme()
  const { t, i18n }: UseTranslationResponse = useTranslation()
  const invertedTextColor = 'inverted-text'
  const { final_dataset }: DeepReadonly<DatasetDto> = dataset
  const [errorAcknowledged, setErrorAcknowledged] = useState(false)
  const [sendTokens, { data, error, loading }]: UseSendTokensTuple = useSendTokens({
    chainInfo: keplrChainConfig(chain)
  })

  const categoriesAsString: string = useMemo(
    () => dataset.categories.map((category: string): string => category).join(', '),
    [dataset.categories]
  )

  const acknowledgeError = useCallback(() => {
    setErrorAcknowledged(prev => !prev)
  }, [])

  const handleBIClick = useCallback(() => {
    sendTokens(transaction.recipientAddress, amountFinal, fee, transaction.memo)
  }, [sendTokens, transaction.memo, transaction.recipientAddress])

  useEffect(() => {
    if (data?.txHash) push(okp4BiUrl)
  }, [data?.txHash, okp4BiUrl, push])

  return (
    <div className={`okp4-dataset-preview ${theme}`}>
      <Typography as="h2" color={invertedTextColor} fontSize="large" fontWeight="bold">
        {dataset.name}
      </Typography>
      <Typography color={invertedTextColor}>{t(`dataset:${dataset.type}`)}</Typography>
      <Typography color={invertedTextColor} fontSize="small">
        {t(`dataset:${dataset.access.toLocaleLowerCase()}`)}
      </Typography>
      <Typography color={invertedTextColor} fontSize="small">
        {categoriesAsString}
      </Typography>
      <Typography color={invertedTextColor} fontSize="x-small">
        {t('dataset:by', {
          provider: dataset.provider,
          updated: formatDate(dataset.updatedOn, i18n.language)
        })}
      </Typography>
      <Button
        backgroundColor={theme === 'dark' ? 'secondary' : 'primary'}
        label={t('dataset:add')}
        size="large"
      />
      {final_dataset && (
        <Button
          backgroundColor={theme === 'dark' ? 'secondary' : 'primary'}
          label={loading ? t('dataset:tx.sending') : t('dataset:see')}
          {...(loading && { leftIcon: <div className="loader" /> })}
          onClick={handleBIClick}
          size="large"
        />
      )}
      <Toast
        autoDuration={4000}
        description={error?.message}
        isOpened={!!error && !errorAcknowledged}
        onOpenChange={acknowledgeError}
        severityLevel="error"
        title={'Error'}
      />
    </div>
  )
}

export default DatasetPreview
