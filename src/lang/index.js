import Vue from 'vue'
import VueI18n from 'vue-i18n'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import zhLocale from './zh'
import enLocale from './en'
import { getStorage } from '~/utils/storage'
import ElementLocale from 'element-ui/lib/locale'
Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
}

const i18n = new VueI18n({
  locale: getStorage('language') || 'zh',
  messages,
  silentTranslationWarn: true
})

ElementLocale.i18n((key, value) => i18n.t(key, value))

export default i18n
