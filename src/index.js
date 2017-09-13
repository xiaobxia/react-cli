import 'babel-polyfill';
// import { app } from './app';
// app.$mount('#app');

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import App from './app';
//渲染根元素
//在顶层使用Provider可以避免把store 作为 props 传递到每一个被 connet() 包装的组件
ReactDOM.render(
  <Provider>
    <App/>
  </Provider>,
  document.getElementById('app'));
