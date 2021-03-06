import React from 'react';
import axios from 'axios';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import 'antd/dist/antd.css';
import './scss/index.scss';
import Main from './module/main';
import NoMatch from 'localComponent/noMatch'
import routes from './router';
import store from './store';
import Nprogress from 'nprogress'

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

//http拦截
axios.interceptors.request.use(function (config) {
  Nprogress.start();
  return config;
}, function (error) {
  return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
  Nprogress.done();
  let data = response.data;
  if (response.status === 0) {
    console.warn('[HTTP status=0]');
    return response;
  } else {
    //200
    if (data.status !== 0) {
      //有错误
      switch (data.status) {
        case 'USER_SESSION_TIMEOUT':
          store.dispatch({type: 'APP_SHOW_GLOB_LOGIN'});
          break;
      }
    }
    return response;
  }
}, function (error) {
  Nprogress.done();
  console.log('http in error');
  let response = error.response;
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
  return (
    <LocaleProvider locale={appLocale.antd}>
      <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
        <Provider store={store}>
          <Main>
            {/*排他路由*/}
            <Switch>
              {routes.map(function (item, index) {
                return (<Route exact key={index} path={item.path} component={item.component}/>)
              })}
              {/*404的路由，和express的路由很像*/}
              {/*
               如果路由需要鉴权可以使用404
               <Route exact path='/404' component={NoMatch}/>
              */}
              <Route component={NoMatch}/>
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

