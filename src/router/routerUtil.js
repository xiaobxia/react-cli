const lazyLoading = (path, index = false) => () => System.import(`module/${path}${index ? '/index' : ''}.vue`);

const routerUtil = {
  lazyLoading,
  /**
   * 通过menu URL生成Component
   * @param menus
   * @returns {*}
   */
  generateMenuComponent(menus) {
    if (menus) {
      for (let i = 0; i < menus.length; i++) {
        let menu = menus[i];
        menu.meta = {icon: menu.icon, expanded: menu.expanded};
        if (menu.url) {
          menu.component = lazyLoading(menu.url);
        } else if (menu.children) {
          routerUtil.generateMenuComponent(menu.children);
        }
      }
    }

    return menus;
  },

  /**
   *    Menu should have 2 levels.
   * @param menu
   * @param routes
   * @returns {Array}
   */
  generateRoutesFromMenu(menu = [], routes = []) {
    for (let i = 0, l = menu.length; i < l; i++) {
      let item = menu[i];
      if (item.path) {
        routes.push(item);
      }
      if (!item.component) {
        routerUtil.generateRoutesFromMenu(item.children, routes);
      }
    }
    return routes;
  }
};

export default routerUtil;
