import 'animate.css';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import './scss/index.scss';

import ElementUI, {MessageBox} from 'element-ui';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import * as filters from './filters';
import i18n from './i18n';
//全局store
import store from './store';
import * as types from './store/mutationTypes';
import http from 'util/httpUtil';

Vue.use(NProgress);
Vue.use(VueClipboards);
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.vm._t(key, value)
});

// 进入路由前的钩子
router.beforeEach((to, from, next) => {
  // document.body.scrollTop = 0;
  // store.commit(types.GLOBAL_LOADING, {loading: true})
  switch (to.path) {
    case '/':
      next();
      break;
    case '/dashboard':
      next();
      break;
    default:
      // 不校验菜单权限
      if (to.path.indexOf('/add') !== -1 || (to.params && to.params._uncheck) || (to.query && to.query._uncheck)) {
        next();
        return;
      }
      //菜单权限校验
      http.post('sys/user/checkUserMenuPriv', {path: to.path}).then(hasPriv => {
        if (hasPriv) {
          next();
        } else {
          next(false);// 中断当前的导航
          // closeGlobalLoading();
          MessageBox.alert('没有菜单权限，请联系您的管理员！', 'Error', {type: 'error'});
        }
      }, () => {
        // closeGlobalLoading();
      });
      break;
  }
});
// 进入路由的钩子
router.afterEach(route => {
});

// customer vue filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

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
          if (!store.state.globalLoginDialog) {
            store.commit(types.GLOBAL_LOGIN_DIALOG_OPEN);
          }
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
  console.log('in error')
  let response = error.response;
  console.info('[HTTP ERROR]', response);
  // if (request.headers.has('ignoreGlobalDialog')) {
  //   return response;
  // }
  const {errorCode, errorMessage} = response.data || {};
  let errorMsg = 'Server Internal Error. Please contact Administrator!';
  if (errorMessage) {
    errorMsg = `${errorMessage}`;
  }
  console.log(errorCode, errorMsg);
  const msg = `${response.status} ${response.statusText}; \r\n${errorMsg}`;
  MessageBox.alert(msg, 'Error', {type: 'error'});
  // Do something with response error
  return Promise.reject(error);
});

const nprogress = new NProgress({parent: '.nprogress-container'});

const app = new Vue({
  router,
  store,
  i18n,
  nprogress,
  ...App
});

export {app, router, store};
