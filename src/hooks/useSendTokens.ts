/* eslint-disable @typescript-eslint/typedef */
import type { Keplr } from '@keplr-wallet/types'
import { SigningStargateClient } from '@cosmjs/stargate'
import type { DeepReadonly } from '@okp4/ui'
import { useState } from 'react'

export type UseSendTokensArgs = {
  chainId: string
  recipientAddress: string
  amount: Amount
  fee: Fee
  memo?: string
}

export type UseSendTokensResponse = {
  data: {
    txHash: string
  } | null
  loading: boolean
  error: Error | null
}

export type UseSendTokensHandler = () => void

export type UseSendTokensTuple = [handler: UseSendTokensHandler, response: UseSendTokensResponse]

export type Amount = {
  denom: string
  amount: string
}

export type Fee = {
  amount: Amount[]
  gas: string
}

const checkKeplrExtensionAvailability = (): void => {
  if (!window.getOfflineSigner || !window.keplr) {
    throw new Error(
      'The Keplr extension must be installed and activated in your browser in order to use it.'
    )
  }
}

const enableKeplr = async (chainId: string): Promise<void> =>
  window.keplr &&
  (await window.keplr.enable(chainId).catch(() => {
    throw new Error(
      'Oops, an error occurred while trying to connect to the wallet. Please try again later or contact us.'
    )
  }))

export const useSendTokens = (args: DeepReadonly<UseSendTokensArgs>): UseSendTokensTuple => {
  const [data, setData] = useState<UseSendTokensResponse['data']>(null)
  const [loading, setLoading] = useState<UseSendTokensResponse['loading']>(false)
  const [error, setError] = useState<UseSendTokensResponse['error']>(null)

  const handler = async (): Promise<void> => {
    const { chainId, recipientAddress, amount, memo, fee }: DeepReadonly<UseSendTokensArgs> = args
    try {
      checkKeplrExtensionAvailability()
      await enableKeplr(chainId)
      const offlineSigner = (window.keplr as Keplr).getOfflineSigner(chainId)
      const accounts = await offlineSigner.getAccounts()
      const client = await SigningStargateClient.connectWithSigner(
        'https://api.devnet.okp4.network:443/rpc',
        offlineSigner
      )
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
