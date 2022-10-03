export const formatDate = (date: string, language: string = 'en'): string => {
  const languages: Record<string, string> = {
    en: 'en-US',
    fr: 'fr-FR'
  }
  const foundLanguage: string | undefined = Object.keys(languages).find(
    (key: string) => key === language
  )

  return new Date(date).toLocaleString(
    foundLanguage === undefined ? languages.en : languages[foundLanguage],
    {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }
  )
}
