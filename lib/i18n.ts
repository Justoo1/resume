import en from '@/messages/en.json'
import es from '@/messages/es.json'
import fr from '@/messages/fr.json'
import de from '@/messages/de.json'

export type Locale = 'en' | 'es' | 'fr' | 'de'

export const locales: Locale[] = ['en', 'es', 'fr', 'de']

export const defaultLocale: Locale = 'en'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const translations: Record<string, any> = {
  en,
  es,
  fr,
  de
}

export function getTranslations(locale: Locale = defaultLocale) {
  return translations[locale] || translations[defaultLocale]
}
