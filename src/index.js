/**
 * Created by xiaobxia on 2017/10/17.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app'
import Perf from 'react-addons-perf'
//生产环境移除
window.Perf = Perf;
//Perf.start()
//Perf.stop()
//Perf.printInclusive()
//Perf.printWasted()  无意义渲染
ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
