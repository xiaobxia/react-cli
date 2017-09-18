/**
 * Created by xiaobxia on 2017/9/13.
 */
import { createStore, applyMiddleware, bindActionCreators } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger'
import page1Reducers from './reducers';
import * as page1Action from './actions';

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore);



//TODO 一个应用只有一个state

let initialState = {

};

export let store = createStoreWithMiddleware(page1Reducers, initialState);

export const mapStateToProps = state => {
  //可以在这筛选state
  //不注入全局的可以防止全局渲染
  return {
    page1: state.page1
  }
};

export const mapDispatchToProps = dispatch => ({
  //action在此为引入
  actions: bindActionCreators(page1Action, dispatch)
});
