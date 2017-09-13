import mutations from './mutations';
import actions from './actions';
const state = {
  config: {
    sidebar: true
  },
  mobile: false,
  sidebar: true,
  menu: [],
  routers: {},
  globalLoading: false,
  globalLoginDialog: false
};

const getters = {
  getGlobalLoading: state => state.globalLoading,
  getGlobalLoginDialog: state => state.globalLoginDialog
};



export default {state, getters, mutations, actions};
