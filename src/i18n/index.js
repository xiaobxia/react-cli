import Vue from 'vue';
import VueI18n from 'vue-i18n';
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import zh from './zh';
import en from './en'

Vue.use(VueI18n);

const messages = {
  en: {
    ...en,
    ...enLocale
  },
  zh: {
    ...zh,
    ...zhLocale
  }
};

const i18n = new VueI18n({
  locale: 'zh', // set locale
  messages // set locale messages
});

export default i18n;
