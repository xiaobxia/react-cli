import React from 'react'
import Bundle from '../component/bundle'
import Dashboard from 'bundle-loader?lazy!module/dashboard'
import User from 'bundle-loader?lazy!module/user'

//router4就得以这种方式懒加载
//其实model不需要按需加载，因为本来就不应该太大，应该由组件自己维护状态
let getComponent = (component) => {
  return (props) => (
    <Bundle load={component}>
      {(Container) => {
        return (<Container {...props}/>);
      }}
    </Bundle>
  );
};
export default [
  {
    name: 'Home',
    path: '/home',
    component: getComponent(Dashboard)
  },
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
    name: 'User',
    path: '/user/index',
    component: getComponent(User)
  }
];
