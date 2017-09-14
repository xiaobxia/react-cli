/**
 * Created by xiaobxia on 2017/9/13.
 */
import { combineReducers } from 'redux'
import * as types from './actionTypes';
//TODO 可类比vue中的mutation，区别在于在react中接受旧的state，修改后返回新的state
//TODO 不要直接对state做修改，而是对其副本做修改
//TODO state必须有默认值
//TODO 这里的state不是指整个state树，而是combineReducers中key对应的state
//TODO reducer是纯净的，不能有请求，个随机数据
function reducers(state = {}, action) {
  //这里的state是glob内的state
  let data = Object.assign({}, state);
  //action是actions中返回的对象
  switch (action.type) {
    case types.CHANGE_COUNT: {
      //不要直接修改state
      console.log(action)
      data.count = action.number;
      return data;
    }
    //TODO 需要有default返回返回旧的state
    default: {
      return state
    }
  }
}

//不combineReducers，就没有命名空间了
const globReducers = combineReducers({
  glob: reducers
});

export default globReducers;
