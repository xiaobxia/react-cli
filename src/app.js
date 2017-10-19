import React from 'react';
import axios from 'axios';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import 'antd/dist/antd.css';
import './scss/index.scss';
import Main from './module/main';
import PrivateRoute from './component/privateRoute';
import routes from './router';
import {store} from './store';

/**
 * ***********国际化************
 **/
import {LocaleProvider, Modal} from 'antd';
import {addLocaleData, IntlProvider} from 'react-intl';
import 'intl';
import 'intl/locale-data/jsonp/en.js';
// 中文
import appLocaleData from 'react-intl/locale-data/zh';
import zhMessages from '../locales/zh.json';
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
console.log('app.js init');
axios.interceptors.response.use(function (response) {
  // Do something with response data
  let data = response.data;
  if (response.status === 0) { //ignore
    console.warn('[HTTP status=0]');
    return response;
  } else { //200
    if (data.success === false) {
      console.info('[HTTP ERROR]', response);
      switch (data.errorCode) {
        case 'USER_NEED_LOGIN':
        case 'USER_SESSION_TIMEOUT':
          //MessageBox.alert('you need login.');
          break;
        // default:
        //   if (!request.headers.has('ignoreGlobalDialog')) {
        //     //const msg = `[${data.errorCode}]${data.errorMessage}`;
        //     const msg = `${data.errorMessage}`;
        //     MessageBox.alert(msg, 'Error', {type: 'error'});
        //   }
        //   break;
      }
      response.ok = false;
      // next(request.respondWith(data));
      //throw data; // end http request, hack it
    }
    return response;
  }
}, function (error) {
  console.log('in error');
  let response = error.response;
  console.info('[HTTP ERROR]', response);
  const {errorCode, errorMessage} = response.data || {};
  let errorMsg = 'Server Internal Error. Please contact Administrator!';
  if (errorMessage) {
    errorMsg = `${errorMessage}`;
  }
  console.log(errorCode, errorMsg);
  const msg = `${response.status} ${response.statusText}; \r\n${errorMsg}`;
  Modal.error({
    title: 'This is an error message',
    content: msg
  });
  // Do something with response error
  return Promise.reject(error);
});

//无状态组件
const App = () => {
  //TODO 最外层的作用就是绑定组件，注入store
  return (
    <LocaleProvider locale={appLocale.antd}>
      <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
        <Provider store={store}>
          <Main>
            {/*排他路由*/}
            <Switch>
              {routes.map(function (item, index) {
                if (item.noCheck) {
                  return (<Route exact key={index} path={item.path} component={item.component}/>)
                } else {
                  return (<PrivateRoute exact key={index} path={item.path} component={item.component}/>)
                }
              })}
            </Switch>
          </Main>
        </Provider>
      </IntlProvider>
    </LocaleProvider>
  )
};

//渲染根元素
//在顶层使用Provider可以避免把store 作为 props 传递到每一个被 connet() 包装的组件
export default App;

