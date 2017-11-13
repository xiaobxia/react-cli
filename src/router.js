import React from 'react'
import Bundle from './components/bundle'
import Login from 'bundle-loader?lazy!localRoutes/login'
import Dashboard from 'bundle-loader?lazy!localRoutes/dashboard'
import Test from 'bundle-loader?lazy!localRoutes/test'

//router4就得以这种方式懒加载
//其实model不需要按需加载，因为本来就不应该太大，应该由组件自己维护状态
let getComponent = (component) => {
  return (props) => {
    return (
      <Bundle load={component}>
        {(Container) => {
          return (<Container {...props}/>);
        }}
      </Bundle>
    );
  }
};
export const authRoutes = [
  {
    name: 'Login',
    path: '/user/login',
    component: getComponent(Login)
  }
];

export const baseRoutes = [
  {
    name: 'Dashboard Home',
    path: '/',
    component: getComponent(Dashboard)
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: getComponent(Dashboard)
  },
  {
    name: 'Test',
    path: '/test',
    component: getComponent(Test)
  }
];