/**
 * Created by xiaobxia on 2017/10/19.
 */
import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Menu, Icon} from 'antd';
class AppMenu extends Component {
  // enable(message) {
  //   if (this.unblock) {
  //     this.unblock()
  //   }
  //   this.unblock = this.props.history.block(message)
  // }
  //
  // disable() {
  //   if (this.unblock) {
  //     this.unblock();
  //     this.unblock = null
  //   }
  // }
  //
  // componentWillMount() {
  //   this.enable(false)
  //   //this.enable(this.props.message)
  // }
  //
  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps)
  //
  //   // if (nextProps.when) {
  //   //   if (!this.props.when || this.props.message !== nextProps.message)
  //   //     this.enable(nextProps.message)
  //   // } else {
  //   //   this.disable()
  //   // }
  // }
  //
  // componentWillUnmount() {
  //   // this.disable()
  // }

  render() {
    let props = this.props;
    let currentPathName = props.location.pathname;
    let menus = props.menus;
    let menusMap = props.menusMap;
    // props.history.listen((location, action) => {
    //   console.log(location)
    // });
    // NavLink不优雅
    // 不能用defaultSelectedKeys
    return (
      <Menu theme="dark" selectedKeys={[menusMap[currentPathName]]} mode="inline">
        {menus.map((item) => {
          return (
            <Menu.Item key={item.key}>
              <Link to={item.path}>
                <Icon type={item.icon}/>
                <span>{item.name}</span>
              </Link>
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }
}

export default withRouter(AppMenu);
