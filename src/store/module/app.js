/**
 * Created by xiaobxia on 2017/10/19.
 */
import http from 'localUtil/httpUtil'
const APP_LOGIN = 'APP_LOGIN';
const APP_CHECK_LOGIN = 'APP_CHECK_LOGIN';
const APP_CHECK_LOGIN_SUC = 'APP_CHECK_LOGIN_SUC';

export const appActions = {
  appCheckLogin() {
    return (dispatch) => {
      return http.get(`sys/isLogin`).then((res) => {
        console.log(res);
      });
    };
  }
};

//TODO 可类比vue中的mutation，区别在于在react中接受旧的state，修改后返回新的state
//TODO 不要直接对state做修改，而是对其副本做修改
//TODO state必须有默认值
//TODO 这里的state不是指整个state树，而是combineReducers中key对应的state
//TODO reducer是纯净的，不能有请求，个随机数据
export const appReducers = (state = {loginUser: null}, action) => {
  //这里的state是glob内的state
  let data = Object.assign({}, state);
  //action是actions中返回的对象
  switch (action.type) {
    case APP_CHECK_LOGIN_SUC: {
      data.loginUser = action.user;
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
