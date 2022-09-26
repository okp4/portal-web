import { loadTranslations } from '@okp4/ui'

import footer_en from './footer/footer_en.json'
import footer_fr from './footer/footer_fr.json'
import dashboard_en from './dashboard/dashboard_en.json'
import dashboard_fr from './dashboard/dashboard_fr.json'
import explore_en from './explore/explore_en.json'
import explore_fr from './explore/explore_fr.json'

const translationsToLoad = [
  { lng: 'en', namespace: 'footer', resource: footer_en },
  { lng: 'fr', namespace: 'footer', resource: footer_fr },
  { lng: 'en', namespace: 'dashboard', resource: dashboard_en },
  { lng: 'fr', namespace: 'dashboard', resource: dashboard_fr },
  { lng: 'en', namespace: 'explore', resource: explore_en },
  { lng: 'fr', namespace: 'explore', resource: explore_fr }
]

loadTranslations(translationsToLoad)
