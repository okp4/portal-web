import { loadTranslations } from '@okp4/ui'

import footer_en from './footer/footer_en.json'
import footer_fr from './footer/footer_fr.json'
import dashboard_en from './dashboard/dashboard_en.json'
import dashboard_fr from './dashboard/dashboard_fr.json'
import explore_en from './explore/explore_en.json'
import explore_fr from './explore/explore_fr.json'
import dataverse_en from './dataverse/dataverse_en.json'
import dataverse_fr from './dataverse/dataverse_fr.json'
import governance_en from './governance/governance_en.json'
import governance_fr from './governance/governance_fr.json'

const translationsToLoad = [
  { lng: 'en', namespace: 'dataverse', resource: dataverse_en },
  { lng: 'fr', namespace: 'dataverse', resource: dataverse_fr },
  { lng: 'en', namespace: 'governance', resource: governance_en },
  { lng: 'fr', namespace: 'governance', resource: governance_fr },
  { lng: 'en', namespace: 'footer', resource: footer_en },
  { lng: 'fr', namespace: 'footer', resource: footer_fr },
  { lng: 'en', namespace: 'dashboard', resource: dashboard_en },
  { lng: 'fr', namespace: 'dashboard', resource: dashboard_fr },
  { lng: 'en', namespace: 'explore', resource: explore_en },
  { lng: 'fr', namespace: 'explore', resource: explore_fr }
]

loadTranslations(translationsToLoad)
