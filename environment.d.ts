declare namespace NodeJS {
  interface ProcessEnv {
    GOVERNANCE_URL: string // The temporary governance link to our governance model
    OKP4_DISCORD_URL: string
    OKP4_GITHUB_URL: string
    OKP4_LINKEDIN_URL: string
    OKP4_MEDIUM_URL: string
    OKP4_TELEGRAM_URL: string
    OKP4_TWITTER_URL: string
    OKP4_WEBSITE_URL: string
    // The data folder path
    DATA_PATH: string
  }
}

declare module 'next/config' {
  declare const _default: () => {
    publicRuntimeConfig: {
      version: string
    }
  }

  export default _default
}
