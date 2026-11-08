import { english } from './en'

export const locales = { es: 'es-US', en: 'en-US' }

export function createTranslator(language) {
  return (text, values = {}) => {
    if (typeof text !== 'string') return text
    const key = text.trim()
    const translated = language === 'en' ? english[key] ?? key : key
    const result = text.replace(key, () => translated)
    return result.replace(/\{(\w+)\}/g, (match, name) => values[name] ?? match)
  }
}

export function formatMoney(amount, language) {
  return new Intl.NumberFormat(locales[language] || locales.es, {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'code',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}
