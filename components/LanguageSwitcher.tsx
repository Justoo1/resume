'use client'

import { useLanguage } from '@/components/providers/LanguageProvider'
import { Button } from '@/components/ui/button'
import { Languages } from 'lucide-react'
import { Locale } from '@/lib/i18n'

const languages = [
  { code: 'en' as Locale, name: 'English', flag: '🇺🇸' },
  { code: 'es' as Locale, name: 'Español', flag: '🇪🇸' },
  { code: 'fr' as Locale, name: 'Français', flag: '🇫🇷' },
  { code: 'de' as Locale, name: 'Deutsch', flag: '🇩🇪' }
]

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()

  // const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0]

  return (
    <div className="relative group">
      <Button variant="outline" size="icon" className="w-10 h-10">
        <Languages className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Switch language</span>
      </Button>

      {/* Dropdown */}
      <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLocale(lang.code)}
            className={`w-full px-4 py-3 text-left hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-3 first:rounded-t-lg last:rounded-b-lg ${
              locale === lang.code ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''
            }`}
          >
            <span className="text-2xl">{lang.flag}</span>
            <span className="font-medium">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
