import type { NextApiRequest, NextApiResponse } from 'next'

export type Config = {
  app: {
    websiteUrl: string
    navigationMenuUrls: {
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
  }
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export default function handler(_req: NextApiRequest, res: NextApiResponse<Config>): void {
  const config: Config = {
    app: {
      websiteUrl: process.env.OKP4_WEBSITE_URL,
      navigationMenuUrls: {
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
      }
    }
  }
  return res.status(200).json(config)
}
