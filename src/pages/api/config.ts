import type { NextApiRequest, NextApiResponse } from 'next'

export type Config = {
  app: {
    governanceUrl: string
  }
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export default function handler(_req: NextApiRequest, res: NextApiResponse<Config>): void {
  const config: Config = {
    app: {
      governanceUrl: process.env.GOVERNANCE_URL
    }
  }
  return res.status(200).json(config)
}
