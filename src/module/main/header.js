/**
 * Created by xiaobxia on 2017/10/20.
 */
import React, {Component} from 'react'
import {Menu, Icon, Dropdown, Avatar} from 'antd';
import {injectIntl} from 'react-intl';
import {consoleRender} from 'localUtil/consoleLog'
class AppHeader extends Component {
  state = {
    loginUserMenuOpen: false
  };

  visibleChangeHandler = (visible) => {
    this.setState({
      loginUserMenuOpen: visible
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    const thisProps = this.props || {};
    const thisState = this.state || {};
    nextState = nextState || {};
    nextProps = nextProps || {};
    if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
      Object.keys(thisState).length !== Object.keys(nextState).length) {
      return true;
    }
    for (const key in nextProps) {
      if (thisProps[key] !== nextProps[key]) {
        return true;
      }
    }
    for (const key in nextState) {
      if (thisState[key] !== nextState[key]) {
        return true;
      }
    }
    return false;
  }

  render() {
    consoleRender('Header render');
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

export default injectIntl(AppHeader);
