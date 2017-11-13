import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import 'antd/dist/antd.css';
import './scss/index.scss';
import AuthLayout from './layouts/AuthLayout'
import BaseLayout from './layouts/BaseLayout'
import PrivateRoute from 'localComponent/privateRoute'
import {appActions} from 'localStore/actions'

/**
 * ***********国际化************
 **/
import {LocaleProvider, Spin} from 'antd';
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

//无状态组件
class App extends PureComponent {
  componentWillMount() {
    this.props.appActions.appCheckLogin();
  }

  render() {
    console.log('App render');
    let store = this.props.app;
    //防止页面一闪
    if (store.isGlobLoading || !store.checkLoginEnd) {
      return (
        <div className="glob-loading-wrap">
          <Spin size="large"/>
        </div>
      );
    }
    return (
      <LocaleProvider locale={appLocale.antd}>
        <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
          <Router>
            <Switch>
              <Route path="/user" component={AuthLayout}/>
              <PrivateRoute path="/" component={BaseLayout}/>
            </Switch>
          </Router>
        </IntlProvider>
      </LocaleProvider>
    );
  }
}


const mapStateToProps = state => {
  return {
    app: state.app
  }
};
const mapDispatchToProps = dispatch => ({
  //action在此为引入
  appActions: bindActionCreators(appActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

