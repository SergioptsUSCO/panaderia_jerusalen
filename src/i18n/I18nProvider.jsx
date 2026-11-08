import { useEffect, useMemo, useState } from 'react'
import { I18nContext } from './I18nContext'
import { createTranslator, formatMoney, locales } from './translations'

function preferredLanguage() {
  try {
    const saved = localStorage.getItem('bakery-language')
    if (saved === 'es' || saved === 'en') return saved
  } catch {
    // The selector still works when browser storage is unavailable.
  }
  return typeof navigator !== 'undefined' && navigator.language?.startsWith('en')
    ? 'en'
    : 'es'
}

export default function I18nProvider({ children, initialLanguage }) {
  const [language, setLanguage] = useState(() =>
    initialLanguage === 'es' || initialLanguage === 'en'
      ? initialLanguage
      : preferredLanguage()
  )

  useEffect(() => {
    document.documentElement.lang = language
    document.title = language === 'en'
      ? 'Panadería Jerusalén | Artisan Bakery'
      : 'Panadería Jerusalén | Pan artesanal'
    try {
      localStorage.setItem('bakery-language', language)
    } catch {
      // Private browsing may prevent saving the preference.
    }
  }, [language])

  const value = useMemo(() => ({
    language,
    locale: locales[language],
    setLanguage: (next) => {
      if (next === 'es' || next === 'en') setLanguage(next)
    },
    t: createTranslator(language),
    formatPrice: (amount) => formatMoney(amount, language),
  }), [language])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
