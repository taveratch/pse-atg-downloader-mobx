import IntlMessageFormat from 'intl-messageformat'
import _ from 'lodash'
// import history from 'src/common/history'

const supportedLocales = ['en', 'th']
const message = {
  'en': {
    ...require('src/common/lang/en').default,
    ...require('src/modules/admin/lang/en').default,
    ...require('src/modules/signin/lang/en').default,
    ...require('src/modules/app/lang/en').default,
  },
  'th': {
    ...require('src/common/lang/th').default,
    ...require('src/modules/admin/lang/th').default,
    ...require('src/modules/signin/lang/th').default,
    ...require('src/modules/app/lang/th').default
  }
}

class I18n {

  init(locale = 'en') {
    if (supportedLocales.indexOf(locale) < 0) locale = 'en'
    this.locale = locale
  }

  t(key, opt = {}) {
    const m = _.get(message, [this.locale, key])
    if (!m) throw new Error(`${key} was not found for internationalization`)
    const msg = new IntlMessageFormat(_.get(message, [this.locale, key]), this.locale)
    return msg.format(opt)
  }

  getLocale() {
    return this.locale
  }
}

const i18n = new I18n()

export default i18n