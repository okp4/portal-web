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
