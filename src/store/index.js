import { combineReducers, createStore } from 'redux'
import reducers from './reducers'

//TODO 一个应用只有一个state
//不combineReducers，就没有命名空间了
const reducer = combineReducers({
  glob: reducers
});
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
const store = createStore(reducer, {
  glob: {
    count: 1
  }
});

//发出action
//store.dispatch(addTodo('Learn about actions'))

console.log(store.getState())

export default store
