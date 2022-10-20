import { loadTranslations } from '@okp4/ui'
import footer_en from './footer/footer_en.json'
import footer_fr from './footer/footer_fr.json'
import dashboard_en from './dashboard/dashboard_en.json'
import dashboard_fr from './dashboard/dashboard_fr.json'
import datasets_en from './datasets/datasets_en.json'
import datasets_fr from './datasets/datasets_fr.json'

const translationsToLoad = [
  { lng: 'en', namespace: 'footer', resource: footer_en },
  { lng: 'fr', namespace: 'footer', resource: footer_fr },
  { lng: 'en', namespace: 'dashboard', resource: dashboard_en },
  { lng: 'fr', namespace: 'dashboard', resource: dashboard_fr },
  { lng: 'en', namespace: 'datasets', resource: datasets_en },
  { lng: 'fr', namespace: 'datasets', resource: datasets_fr }
]

loadTranslations(translationsToLoad)
