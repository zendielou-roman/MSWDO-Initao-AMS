import { createI18n } from 'vue-i18n'
import en from './locales/en.js'
import fil from './locales/fil.js'
import ceb from './locales/ceb.js'

const savedLocale = localStorage.getItem('locale') || 'en'

export const i18n = createI18n({
  legacy: false,        // required to use the Composition API version
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, fil, ceb },
})