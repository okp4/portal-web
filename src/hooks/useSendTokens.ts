/* eslint-disable @typescript-eslint/typedef */
import type { ChainInfo, Keplr } from '@keplr-wallet/types'
import { SigningStargateClient } from '@cosmjs/stargate'
import type { DeepReadonly } from '@okp4/ui'
import { useState } from 'react'

export type UseSendTokensArgs = {
  chainInfo: ChainInfo
}

export type UseSendTokensResponse = {
  data: {
    txHash: string
  } | null
  loading: boolean
  error: Error | null
}

export type UseSendTokensHandler = (
  recipientAddress: string,
  amount: DeepReadonly<Amount>,
  fee: DeepReadonly<Fee>,
  memo?: string
) => void

export type UseSendTokensTuple = [handler: UseSendTokensHandler, response: UseSendTokensResponse]

export type Amount = {
  denom: string
  amount: string
}

export type Fee = {
  amount: Amount[]
  gas: string
}

const getKeplr = (): Keplr => {
  if (!window.keplr?.getOfflineSigner) {
    throw new Error(
      'The Keplr extension must be installed and activated in your browser in order to use it.'
    )
  }
  return window.keplr
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const enableKeplr = async (chainInfo: DeepReadonly<ChainInfo>): Promise<void> => {
  const throwError: () => void = () => {
    throw new Error(
      'Oops, an error occurred while trying to connect to the wallet. Please try again later or contact us.'
    )
  }
  const keplr = getKeplr()

  return keplr.enable(chainInfo.chainId).catch(() => {
    getKeplr()
      .experimentalSuggestChain(chainInfo as ChainInfo)
      .then(async () => await keplr.enable(chainInfo.chainId))
      .catch(throwError)
  })
}

export const useSendTokens = (args: DeepReadonly<UseSendTokensArgs>): UseSendTokensTuple => {
  const [data, setData] = useState<UseSendTokensResponse['data']>(null)
  const [loading, setLoading] = useState<UseSendTokensResponse['loading']>(false)
  const [error, setError] = useState<UseSendTokensResponse['error']>(null)

  const flushState = (): void => {
    setData(null)
    setLoading(false)
    setError(null)
  }

  const handler = async (
    recipientAddress: string,
    amount: DeepReadonly<Amount>,
    fee: DeepReadonly<Fee>,
    memo?: string
  ): Promise<void> => {
    const { chainInfo }: DeepReadonly<UseSendTokensArgs> = args
    const { chainId, rpc } = chainInfo
    try {
      flushState()
      await enableKeplr(chainInfo)
      const offlineSigner = getKeplr().getOfflineSigner(chainId)
      const accounts = await offlineSigner.getAccounts()
      const client = await SigningStargateClient.connectWithSigner(rpc, offlineSigner)

      setLoading(true)
      const result = await client.sendTokens(
        accounts[0].address,
        recipientAddress,
        [amount],
        fee,
        memo
      )
      setLoading(false)
      if (result.transactionHash)
        setData((prevData: DeepReadonly<UseSendTokensResponse['data']>) => ({
          ...prevData,
          txHash: result.transactionHash
        }))
    } catch (error: unknown) {
      setLoading(false)
      if (error instanceof Error) setError(error)
      else setError(new Error('Oops... An unspecified error occured...'))
    }
  }

  return [handler, { data, loading, error }]
}
