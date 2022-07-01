import TelegrafI18n from 'telegraf-i18n'
import en from './locales/en.json'
import ru from './locales/ru.json'

const i18n = new TelegrafI18n({
  defaultLanguage: 'en',
  defaultLanguageOnMissing: true
})

i18n.loadLocale('en', en)
i18n.loadLocale('ru', ru)

export default i18n