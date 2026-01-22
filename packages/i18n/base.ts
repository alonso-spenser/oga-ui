import { createI18n } from "vue-i18n";
import enLang from "./lang/en";
import cnLang from "./lang/zh-CN";

/**
 * 获取使用的语言
 * @returns {string}
 */
const getLanguage= (): string => {
  let lang = localStorage.getItem("ogaLocale");
  if (!lang) {
    lang = navigator.language;
  }
  if (lang != null) {
    lang = "en|zh-CN".indexOf(lang) > -1 ? lang : "en";
  }
  localStorage.setItem("ogaLocale", lang);
  return lang;
}

const i18n = createI18n({
  fallbackLocale: "en",
  globalInjection: true,
  locale: getLanguage(),
  messages: {
    "zh-CN": {
      ...cnLang,
      main: {},
    },
    en: {
      ...enLang,
      main: {},
    },
  },
});
export default i18n;
