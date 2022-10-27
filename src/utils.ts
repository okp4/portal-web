import type { Config } from './pages/api/config'

const languages: Record<string, string> = {
  en: 'en-US',
  fr: 'fr-FR'
}

export const formatDate = (date: string, language?: string): string => {
  const foundLanguage: string | undefined = Object.keys(languages).find(
    (key: string) => key === language
  )

  return new Date(date).toLocaleString(foundLanguage ?? languages.en, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

export const fetchConfig = async (): Promise<Config> => {
  const res = await fetch('http:localhost:3000/api/config')

  return await res.json()
}
