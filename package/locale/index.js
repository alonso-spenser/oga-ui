import { createApp } from 'vue'
import VueI18n from 'vue-i18n'
import enLang from './lang/en'
import zhCNLang from './lang/zh-CN'
import znTWLang from './lang/zh-TW'

/**
 * 获取使用的语言
 * @returns {string}
 */
function getLanguage () {
  let lang = localStorage.getItem('foUILanguage')
  if (!lang) {
    lang = (navigator.language || navigator.userLanguage)
  }
  lang = 'en|zh-CN'.indexOf(lang) > -1 ? lang : 'en'
  localStorage.setItem('foUILanguage', lang)
  return lang
}
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: getLanguage(),
  messages: {
    'zh-CN': zhCNLang,
    'zh-TW': znTWLang,
    'en': enLang
  }
})

export default i18n


