/**
 * Created by xiaobxia on 2017/8/28.
 */
import * as types from './mutationTypes';
const actions = {
  // Sidebar: show, hide, toggle
  SHOW_SIDEBAR ({ commit }) {
    commit('SIDEBAR', true);
  },
  HIDE_SIDEBAR ({ commit }) {
    commit('SIDEBAR', false);
  },
  TOGGLE_SIDEBAR ({ commit, state }) {
    commit('SIDEBAR', !state.config.sidebar);
  },

  //SideBar Menu
  openMenu ({ commit }, item) {
    commit(types.SIDEBAR_MENU_OPEN, {item});
  },
  closeMenu ({ commit }, item) {
    commit(types.SIDEBAR_MENU_CLOSE, {item});
  },
  toggleMenu ({ commit }, item) {
    commit(types.SIDEBAR_MENU_TOGGLE, {item});
  }
};
export default actions;
