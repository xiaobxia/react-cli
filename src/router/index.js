import Vue from 'vue';
import Router from 'vue-router';

import routers from './routers';
import routerUtil from './routerUtil';

Vue.use(Router);

let dashboardComponent = routerUtil.lazyLoading('common/dashboard');
//let dynamicComponent = routerUtil.lazyLoading('common/dynamicComponent')
//import dynamicComponent from '../module/common/dynamicComponent.vue';

export default new Router({
  mode: 'hash', // hash, history
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({y: 0}), //这个功能只在 HTML5 history 模式下可用
  routes: [
    {
      name: 'Dashboard Home',
      path: '/',
      component: dashboardComponent
    },
    {
      name: 'Home',
      path: '/home',
      component: dashboardComponent
    },
    ...routerUtil.generateRoutesFromMenu(routers)
    // {
    //   name: 'Dynamic',
    //   path: '/:name',
    //   component: dynamicComponent
    // }
    //{
    //  path: '*',
    //  redirect: '/'
    //}
  ]
});

