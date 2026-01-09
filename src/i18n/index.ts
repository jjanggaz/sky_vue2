import VueI18n from "vue-i18n";
import Vue from "vue";
import ko from "./language/ko.json";
import en from "./language/en.json";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: localStorage.getItem("wai_lang") || "ko",
  fallbackLocale: "ko",
  messages: {
    ko,
    en,
  },
});

export default i18n;
