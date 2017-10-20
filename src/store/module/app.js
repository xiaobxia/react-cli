/**
 * Created by xiaobxia on 2017/10/19.
 */
import http from 'localUtil/httpUtil'
const APP_TOGGLE_COLLAPSED = 'APP_TOGGLE_COLLAPSED';
const APP_LOGIN = 'APP_LOGIN';
const APP_LOGIN_SUC = 'APP_LOGIN_SUC';
const APP_CHECK_LOGIN = 'APP_CHECK_LOGIN';
const APP_CHECK_LOGIN_SUC = 'APP_CHECK_LOGIN_SUC';
const APP_LOGOUT_SUC = 'APP_LOGOUT_SUC';

export const appActions = {
  appToggleCollapsed() {
    return {type: APP_TOGGLE_COLLAPSED};
  },
  appCheckLogin() {
    return (dispatch, getState) => {
      dispatch({type: APP_CHECK_LOGIN});
      return http.get('sys/isLogin').then((data) => {
        dispatch({type: APP_CHECK_LOGIN_SUC, loginUser: data});
      });
    };
  },
  appLogin({user, password}) {
    return (dispatch, getState) => {
      dispatch({type: APP_LOGIN});
      return http.post('sys/login', {userCode: user, pwd: password}).then((data) => {
        dispatch({type: APP_CHECK_LOGIN_SUC, loginUser: data});
      });
    };
  },
  appLogout() {
    return (dispatch, getState) => {
      return http.get('sys/logout').then((res) => {
        dispatch({type: APP_LOGOUT_SUC});
      });
    };
  }
};

//TODO 可类比vue中的mutation，区别在于在react中接受旧的state，修改后返回新的state
//TODO 不要直接对state做修改，而是对其副本做修改
//TODO state必须有默认值
//TODO 这里的state不是指整个state树，而是combineReducers中key对应的state
//TODO reducer是纯净的，不能有请求，个随机数据
const appStore = {
  loginUser: null,
  isGlobLoading: false,
  collapsed: localStorage.getItem('collapsed') === 'true'
};
export const appReducers = (state = appStore, action) => {
  //这里的state是glob内的state
  let data = Object.assign({}, state);
  //action是actions中返回的对象
  switch (action.type) {
    case APP_TOGGLE_COLLAPSED: {
      data.collapsed = !data.collapsed;
      if (data.collapsed) {
        localStorage.setItem('collapsed', 'true');
      } else {
        localStorage.removeItem('collapsed');
      }
      return data;
    }
    case APP_CHECK_LOGIN: {
      data.loginUser = null;
      data.isGlobLoading = true;
      return data;
    }
    case APP_CHECK_LOGIN_SUC: {
      data.isGlobLoading = false;
      if (action.loginUser.login === true) {
        data.loginUser = action.loginUser;
        localStorage.setItem('userCode', action.loginUser.userCode);
      }
      return data;
    }
    case APP_LOGIN: {
      data.loginUser = null;
      return data;
    }
    case APP_LOGIN_SUC: {
      data.loginUser = action.loginUser;
      data.collapsed = false;
      localStorage.removeItem('collapsed');
      localStorage.setItem('userCode', action.loginUser.userCode);
      return data;
    }
    case APP_LOGOUT_SUC: {
      data.loginUser = null;
      return data;
    }
    //TODO 需要有default返回返回旧的state
    default: {
      return state
    }
  }
};


//不combineReducers，就没有命名空间了
// const globReducers = combineReducers({
//   glob: reducers
// });
//
// export default globReducers;
