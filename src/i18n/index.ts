import { loadTranslations } from '@okp4/ui'

import footer_en from './footer_en.json'
import footer_fr from './footer_fr.json'

const translationsToLoad = [
  { lng: 'en', namespace: 'footer', resource: footer_en },
  { lng: 'fr', namespace: 'footer', resource: footer_fr }
]

loadTranslations(translationsToLoad)
