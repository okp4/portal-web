import { loadTranslations } from '@okp4/ui'

import footer_en from './footer/footer_en.json'
import footer_fr from './footer/footer_fr.json'
import home_en from './home/home_en.json'
import home_fr from './home/home_fr.json'

const translationsToLoad = [
  { lng: 'en', namespace: 'footer', resource: footer_en },
  { lng: 'fr', namespace: 'footer', resource: footer_fr },
  { lng: 'en', namespace: 'home', resource: home_en },
  { lng: 'fr', namespace: 'home', resource: home_fr }
]

loadTranslations(translationsToLoad)
