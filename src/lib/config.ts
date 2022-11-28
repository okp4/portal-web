import type { Config } from '../types/config.type'

export const config: Config = {
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
    okp4BiUrl: process.env.OKP4_BI_URL,
    createDataspaceUrl: process.env.CREATE_DATASPACE_URL
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
  }
}
