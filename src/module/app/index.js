import React, {Component} from 'react'
import {Provider} from 'react-redux'
import 'antd/dist/antd.css';
import '../../scss/main.scss';
import Main from './main';
import {store} from '../../store'
//国际化
import {LocaleProvider} from 'antd';
import {addLocaleData, IntlProvider} from 'react-intl';
import 'intl';
import 'intl/locale-data/jsonp/en.js';
// 中文
import appLocaleData from 'react-intl/locale-data/zh';
import zhMessages from '../../../locales/zh.json';
const appLocale = {
  messages: {
    ...zhMessages
  },
  antd: null,
  locale: 'zh-Hans-CN',
  data: appLocaleData
};
// 英文
// import antdEn from 'antd/lib/locale-provider/en_US';
// import appLocaleData from 'react-intl/locale-data/en';
// import enMessages from '../locales/en.json';
// const appLocale = {
//   messages: {
//     ...enMessages
//   },
//   antd: antdEn,
//   locale: 'en-US',
//   data: appLocaleData
// };

addLocaleData(appLocale.data);
//TODO 最外层的作用就是绑定组件，注入store
class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (<LocaleProvider locale={appLocale.antd}>
      <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
        <Provider store={store}>
          <Main/>
        </Provider>
      </IntlProvider>
    </LocaleProvider>)
  }
}

//渲染根元素
//在顶层使用Provider可以避免把store 作为 props 传递到每一个被 connet() 包装的组件
export default App;

