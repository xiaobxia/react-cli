import {createStore, applyMiddleware, bindActionCreators} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger'
import globReducers from './reducers';
import * as globAction from './actions';

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore);

//TODO 一个应用只有一个state

/*
 这时的state会和reducer中的key相同
 {
 glob: {
 count: 0
 }
 }
 */

//全局的state，会以第二个参数给的初始值为准，没有这个参数就会以reducer中的为准
//第二个参数一般只对同构应用有用（服务端渲染）
// const store = createStore(reducer, {
//   glob: {
//     count: 1
//   }
// });
let initialState = {
  glob: {
    count: 1,
    theme: 'light'
  }
};

export let store = createStoreWithMiddleware(globReducers, initialState);
console.log(store.getState());

export const mapStateToProps = state => {
  //可以在这筛选state
  //不注入全局的可以防止全局渲染
  return {
    glob: state.glob
  }
};

export const mapDispatchToProps = dispatch => ({
  //action在此为引入
  actions: bindActionCreators(globAction, dispatch)
});

//发出action
//store.dispatch(addTodo('Learn about actions'))

// console.log(store.getState())
//
// export default store
