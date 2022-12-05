import type { DeepReadonly } from '@okp4/ui'
import type { Config } from '../types/config.type'

export type Currency = {
  coinDenom: string
  coinMinimalDenom: string
  coinDecimals: number
  coinGeckoId?: string
  coinImageUrl?: string
}
export type CW20Currency = Currency & {
  type: 'cw20'
  contractAddress: string
}
export type Secret20Currency = Currency & {
  type: 'secret20'
  contractAddress: string
  viewingKey: string
}

export type IBCCurrency = Currency & {
  paths: {
    portId: string
    channelId: string
  }[]
  originChainId: string | undefined
  originCurrency: Currency | CW20Currency | Secret20Currency | undefined
}

export type AppCurrency = Currency | CW20Currency | Secret20Currency | IBCCurrency

export type ChainInfo = {
  rpc: string
  rest: string
  chainId: string
  chainName: string
  stakeCurrency: Currency
  walletUrl?: string
  walletUrlForStaking?: string
  bip44: BIP44
  alternativeBIP44s?: BIP44[]
  bech32Config: Bech32Config
  currencies: AppCurrency[]
  feeCurrencies: Currency[]
  coinType?: number
  gasPriceStep?: {
    low: number
    average: number
    high: number
  }
  features?: string[]
  beta?: boolean
}

export type BIP44 = {
  coinType: number
}

export type Bech32Config = {
  bech32PrefixAccAddr: string
  bech32PrefixAccPub: string
  bech32PrefixValAddr: string
  bech32PrefixValPub: string
  bech32PrefixConsAddr: string
  bech32PrefixConsPub: string
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const keplrChainConfig = (chainArgs: DeepReadonly<Config['chain']>): ChainInfo => ({
  chainId: chainArgs.id,
  chainName: chainArgs.name,
  rpc: chainArgs.endpoints.rpc,
  rest: chainArgs.endpoints.rest,
  bip44: {
    coinType: 118
  },
  bech32Config: {
    bech32PrefixAccAddr: 'okp4',
    bech32PrefixAccPub: 'okp4pub',
    bech32PrefixValAddr: 'okp4valoper',
    bech32PrefixValPub: 'okp4valoperpub',
    bech32PrefixConsAddr: 'okp4valcons',
    bech32PrefixConsPub: 'okp4valconspub'
  },
  currencies: [
    {
      coinDenom: 'KNOW',
      coinMinimalDenom: 'uknow',
      coinDecimals: 6
    }
  ],
  feeCurrencies: [
    {
      coinDenom: 'KNOW',
      coinMinimalDenom: 'uknow',
      coinDecimals: 6
    }
  ],
  stakeCurrency: {
    coinDenom: 'KNOW',
    coinMinimalDenom: 'uknow',
    coinDecimals: 6
  },
  coinType: 118,
  gasPriceStep: {
    low: 0.01,
    average: 0.025,
    high: 0.03
  }
})
