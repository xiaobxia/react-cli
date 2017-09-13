/**
 * Created by xiaobxia on 2017/8/28.
 */
//import assignDeep from 'assign-deep';
import * as types from './mutationTypes';
const mutations = {
  SIDEBAR (state, status = true) {
    state.config.sidebar = status;
  },
  [types.GLOBAL_LOADING] (state, {loading}) {
    state.globalLoading = !!loading;
  },
  [types.GLOBAL_LOGIN_DIALOG_OPEN] (state) {
    state.globalLoginDialog = true;
  },
  [types.GLOBAL_LOGIN_DIALOG_DISMISS] (state) {
    state.globalLoginDialog = false;
  },
  // [types.GLOBAL_ADD_ROUTES](state, data) {
  //   state.routes = assignDeep({}, state.routes, {[data.name]: data.component});
  // },
  [types.SIDEBAR_MENU_OPEN] (state, {item}) {
    item.meta.expanded = true;
  },
  [types.SIDEBAR_MENU_CLOSE] (state, {item}) {
    item.meta.expanded = false;
  },
  [types.SIDEBAR_MENU_TOGGLE] (state, {item}) {
    item.meta.expanded = !item.meta.expanded;
  }
};
export default mutations;
