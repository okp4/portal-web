import dynamic from 'next/dynamic'

// Components using document or window elements must disable ssr to be used on client side
// https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr
export const ContentWithoutSSR = dynamic(async () => import('../../components/content/Content'), {
  ssr: false,
  loading: () => <div />
})

export const ExploreTitleWithoutSSR = dynamic(
  async () => import('../../components/explore/exploreTitle/ExploreTitle'),
  {
    ssr: false,
    loading: () => <div />
  }
)

export const ExploreListConfigurationWithoutSSR = dynamic(
  async () => import('../../components/explore/exploreListConfiguration/ExploreListConfiguration'),
  {
    ssr: false,
    loading: () => <div />
  }
)

export const ExploreListWithoutSSR = dynamic(
  async () => import('../../components/explore/exploreList/ExploreList'),
  {
    ssr: false,
    loading: () => <div />
  }
)

export const ExploreFiltersWithoutSSR = dynamic(
  async () => import('../../components/explore/exploreFilters/ExploreFilters'),
  {
    ssr: false,
    loading: () => <div />
  }
)
