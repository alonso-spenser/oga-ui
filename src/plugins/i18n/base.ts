import { createI18n } from "vue-i18n";
import {getLanguage} from "../utility";
import enLang from "./en";
import enErrorCode from "./en/errorCode";
import enEnumerate from "./en/enumerate";
import enPassport from "./en/passport";
import enNavigation from "./en/navigation";
import enBase from "./en/base";

import cnLang from "./zh-CN";
import cnErrorCode from "./zh-CN/errorCode";
import cnEnumerate from "./zh-CN/enumerate";
import cnPassport from "./zh-CN/passport";
import cnNavigation from "./zh-CN/navigation";

// @ts-ignore
const i18n = createI18n({
  fallbackLocale: "en",
  globalInjection: true,
  locale: getLanguage(),
  messages: {
    "zh-CN": {
      ...cnLang,
      ...cnErrorCode,
      ...cnEnumerate,
      ...cnPassport,
      ...cnNavigation,
      main: {},
    },
    en: {
      ...enLang,
      ...enErrorCode,
      ...enEnumerate,
      ...enPassport,
      ...enNavigation,
      ...enBase,
      main: {},
    },
  },
});
export default i18n;
