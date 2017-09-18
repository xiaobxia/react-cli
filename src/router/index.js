const lazyLoading = (path, index = false) => () => System.import(`module/${path}${index ? '/index' : ''}.js`);

export default [
  {
    name: 'Home',
    path: '/home',
    component: lazyLoading('dashboard/index')
  },
  {
    name: 'Dashboard Home',
    path: '/',
    component: lazyLoading('dashboard/index')
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: lazyLoading('dashboard/index')
  },
  {
    name: 'User',
    path: '/user/index',
    component: lazyLoading('user/index')
  }
];
