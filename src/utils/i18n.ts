import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ja from "../i18n/ja.json";
import zh_CN from "../i18n/zh_CN.json";

const resources = {
  zh_CN: {
    translation: zh_CN,
  },
  ja: {
    translation: ja,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("lang") || "zh_CN",
  fallbackLng: "zh_CN",
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
