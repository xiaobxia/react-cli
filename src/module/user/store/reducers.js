/**
 * Created by xiaobxia on 2017/9/13.
 */
import * as types from './actionTypes';
//TODO 可类比vue中的mutation，区别在于在react中接受旧的state，修改后返回新的state
//TODO 不要直接对state做修改，而是对其副本做修改
export default function reducer(state, action) {
  let data = Object.assign({}, state);
  //action是actions中返回的对象
  switch (action.type) {
    case types.CHANGE_NAME: {
      data.name = 'xxxx';
      return data;
    }
    //TODO 需要有default返回返回旧的state
    default: {
      return state
    }
  }
}
