import Vue from 'vue';
import Vuex from 'vuex';
import assign from 'assign-deep';

import commonStore from './store';
import appStore from '../module/app/bll/appStore';

let globalStore = {};
assign(globalStore, commonStore, appStore);

let modules = {};

//在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。
const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);
Vue.config.debug = debug;

const store = new Vuex.Store({
  strict: debug,
  ...globalStore,
  modules
});

export default store;
