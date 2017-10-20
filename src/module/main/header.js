/**
 * Created by xiaobxia on 2017/10/20.
 */
import React, {Component} from 'react'
import {Menu, Icon, Dropdown, Avatar} from 'antd';
import {injectIntl} from 'react-intl';
class AppHeader extends Component {
  state = {
    loginUserMenuOpen: false
  };

  visibleChangeHandler = (visible) => {
    this.setState({
      loginUserMenuOpen: visible
    });
  };

  render() {
    let locale = this.props.intl.formatMessage;
    const loginUserMenu = (
      <Menu style={{textAlign: 'center'}}>
        <Menu.Item>
          <div onClick={this.props.onLogout}>{locale({id: 'App.logout'})}</div>
        </Menu.Item>
      </Menu>
    );
    return (
      <div>
        <div className="logo">{locale({id: 'App.name'})}</div>
        <Dropdown overlay={loginUserMenu} trigger={['click']} onVisibleChange={this.visibleChangeHandler}>
          <span className="login-user-menu">
            <Avatar className="user-avatar" icon="user"/>
            {this.props.userName}
            <Icon style={{marginLeft: '.5em'}} type={this.state.loginUserMenuOpen ? 'up' : 'down'}/>
          </span>
        </Dropdown>
      </div>
    );
  }
}

export default injectIntl(AppHeader, {
  withRef: true
});
