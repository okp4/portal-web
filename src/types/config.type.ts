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
    createDataspaceUrl: string
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
}