import { loadTranslations } from '@okp4/ui'

import dashboard_en from './dashboard/dashboard_en.json'
import dashboard_fr from './dashboard/dashboard_fr.json'
import dataset_en from './dataset/dataset_en.json'
import dataset_fr from './dataset/dataset_fr.json'
import footer_en from './footer_en.json'
import footer_fr from './footer_fr.json'

const translationsToLoad = [
  { lng: 'en', namespace: 'dataset', resource: dataset_en },
  { lng: 'fr', namespace: 'dataset', resource: dataset_fr },
  { lng: 'en', namespace: 'footer', resource: footer_en },
  { lng: 'fr', namespace: 'footer', resource: footer_fr },
  { lng: 'en', namespace: 'dashboard', resource: dashboard_en },
  { lng: 'fr', namespace: 'dashboard', resource: dashboard_fr },
]

loadTranslations(translationsToLoad)
