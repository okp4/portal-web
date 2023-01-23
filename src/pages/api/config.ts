import type { NextApiRequest, NextApiResponse } from 'next'

export type Config = {
  app: {
    websiteUrl: string
    navigationMenuUrls: {
      homeUrl: string
      createUrl: string
      exploreUrl: string
      interactUrl: string
      learnUrl: string
      okp4Url: string
    }
    socialMediaUrls: {
      discordUrl: string
      githubUrl: string
      linkedinUrl: string
      mediumUrl: string
      telegramUrl: string
      twitterUrl: string
    }
    apiUri: string
    defaultDataspaceId: string
    okp4BiUrl: string
  }
  chain: {
    id: string
    name: string
    endpoints: {
      rpc: string
      rest: string
    }
  }
  transaction: {
    memo: string
    recipientAddress: string
  }
  workflow: {
    argo: {
      apiUrl: string
      clientUrl: string
      authorization: {
        bearer: string
      }
    }
  }
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export default function handler(_req: NextApiRequest, res: NextApiResponse<Config>): void {
  const config: Config = {
    app: {
      websiteUrl: process.env.OKP4_WEBSITE_URL,
      navigationMenuUrls: {
        homeUrl: process.env.NAVIGATION_MENU_HOME_URL,
        createUrl: process.env.NAVIGATION_MENU_CREATE_URL,
        exploreUrl: process.env.NAVIGATION_MENU_EXPLORE_URL,
        interactUrl: process.env.NAVIGATION_MENU_INTERACT_URL,
        learnUrl: process.env.NAVIGATION_MENU_LEARN_URL,
        okp4Url: process.env.NAVIGATION_MENU_OKP4_URL
      },
      socialMediaUrls: {
        discordUrl: process.env.OKP4_DISCORD_URL,
        githubUrl: process.env.OKP4_GITHUB_URL,
        linkedinUrl: process.env.OKP4_LINKEDIN_URL,
        mediumUrl: process.env.OKP4_MEDIUM_URL,
        telegramUrl: process.env.OKP4_TELEGRAM_URL,
        twitterUrl: process.env.OKP4_TWITTER_URL
      },
      apiUri: process.env.API_URI,
      defaultDataspaceId: process.env.DEFAULT_DATASPACE_ID,
      okp4BiUrl: process.env.OKP4_BI_URL
    },
    chain: {
      id: process.env.CHAIN_ID,
      name: process.env.CHAIN_NAME,
      endpoints: {
        rpc: process.env.CHAIN_RPC_ENDPOINT,
        rest: process.env.CHAIN_REST_ENDPOINT
      }
    },
    transaction: {
      memo: process.env.TX_MEMO,
      recipientAddress: process.env.TX_RECIPIENT_ADDRESS
    },
    workflow: {
      argo: {
        apiUrl: process.env.WORKFLOW_ARGO_API_URL,
        clientUrl: process.env.WORKFLOW_ARGO_WEB_URL,
        authorization: {
          bearer: process.env.WORKFLOW_ARGO_AUTHORIZATION_BEARER
        }
      }
    }
  }
  return res.status(200).json(config)
}
