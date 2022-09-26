import type { ExploreDetailsMetadataMapping } from '../types/ExploreDetailsMetadataMapping.type'
import ExploreDetailsMetadataDate from '../components/ExploreDetailsMetadataDate'
import ExploreDetailsMetadataDefault from '../components/ExploreDetailsMetadataDefault'
import ExploreDetailsMetadataStars from '../components/ExploreDetailsMetadataStars'

export const CExploreDetailsMetadataType: Array<ExploreDetailsMetadataMapping> = [
  {
    name: 'size',
    Component: ExploreDetailsMetadataDefault,
    unit: 'Mo',
    className: "",
  },
  {
    name: 'format',
    Component: ExploreDetailsMetadataDefault,
    unit: '',
    className: "uppercase",
  },
  {
    name: 'quality',
    Component: ExploreDetailsMetadataStars,
    unit: '',
    className: "",
  },
  {
    name: 'completude',
    Component: ExploreDetailsMetadataDefault,
    unit: '%',
    className: "",
  },
  {
    name: 'updatedAt',
    Component: ExploreDetailsMetadataDate,
    unit: '',
    className: "",
  },
  {
    name: 'provider',
    Component: ExploreDetailsMetadataDefault,
    unit: '',
    className: "capitalize",
  }
]
