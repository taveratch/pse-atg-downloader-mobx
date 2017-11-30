
const KEY = 'locale'
const DEFAULT_LOCALE = 'en'
const SUPPORTED_LOCALES = ['en', 'th']

class Locale {
  get() {
    const locale = localStorage.getItem(KEY)
    if (locale) return locale
    return DEFAULT_LOCALE
  }

  set(locale) {
    if (SUPPORTED_LOCALES.indexOf(locale) >= 0)
      localStorage.setItem(KEY, locale)
    else
      console.error(locale + ' locale is not supported')
  }
}

const locale = new Locale()

export default locale