import dynamic from 'next/dynamic'

// Components using document or window elements must disable ssr to be used on client side
// https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr
export const ContentWithoutSSR = dynamic(async () => import('../../components/content/Content'), {
  ssr: false
})

export const ExploreTitleWithoutSSR = dynamic(
  async () => import('../../components/explore/exploreTitle/ExploreTitle'),
  {
    ssr: false
  }
)

export const GoBackWithoutSSR = dynamic(
  async () => import('../../components/goBack/Goback'),
  {
    ssr: false
  }
)

export const ExploreCardWithoutSSR = dynamic(
  async () => import('../../components/explore/exploreCard/ExploreCard'),
  {
    ssr: false
  }
)

export const ExploreDetailsWithoutSSR = dynamic(
  async () => import('../../components/explore/exploreDetails/ExploreDetails'),
  {
    ssr: false
  }
)