import { loadTranslations } from '@okp4/ui'

import dataspace_en from './dataspace/dataspace_en.json'
import dataspace_fr from './dataspace/dataspace_fr.json'
import header_en from './header/header_en.json'
import header_fr from './header/header_fr.json'
import dashboard_en from './dashboard/dashboard_en.json'
import dashboard_fr from './dashboard/dashboard_fr.json'
import dataset_en from './dataset/dataset_en.json'
import dataset_fr from './dataset/dataset_fr.json'
import footer_en from './footer/footer_en.json'
import footer_fr from './footer/footer_fr.json'

const translationsToLoad = [
  { lng: 'en', namespace: 'dataset', resource: dataset_en },
  { lng: 'fr', namespace: 'dataset', resource: dataset_fr },
  { lng: 'en', namespace: 'dataspace', resource: dataspace_en },
  { lng: 'fr', namespace: 'dataspace', resource: dataspace_fr },
  { lng: 'en', namespace: 'header', resource: header_en },
  { lng: 'fr', namespace: 'header', resource: header_fr },
  { lng: 'en', namespace: 'footer', resource: footer_en },
  { lng: 'fr', namespace: 'footer', resource: footer_fr },
  { lng: 'en', namespace: 'dashboard', resource: dashboard_en },
  { lng: 'fr', namespace: 'dashboard', resource: dashboard_fr }
]
loadTranslations(translationsToLoad)
