/**
 * Created by xiaobxia on 2017/9/13.
 */
import { combineReducers } from 'redux'
import { createStore } from 'redux'
import reducers from './reducers'
//TODO 一个应用只有一个state
const state = {
  name: 'react'
};

const reducer = combineReducers({
  reducers
});

const store = createStore(reducer);

export default store
