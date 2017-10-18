import React, {Component} from 'react'
import {connect} from 'react-redux'
import {HashRouter as Router, Link} from 'react-router-dom'
import {injectIntl} from 'react-intl';
import {Menu, Icon, Layout} from 'antd';
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

import {mapStateToProps, mapDispatchToProps} from '../../store'

class Main extends Component {
  constructor() {
    super();
  }

  state = {
    collapsed: false
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  //生命周期mount
  componentDidMount() {
  }

  //生命周期销毁前
  componentWillUnmount() {
  }

  render() {
    console.log('App props', this.props);
    let locale = this.props.intl.formatMessage;
    return (
      <Router>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            className="app-sider"
            collapsed={this.state.collapsed}
          >
            <div className="trigger-wrap">
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggleCollapsed}
              />
            </div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              {/*组件中的命名空间*/}
              <Menu.Item key="1">
                <Link to="/dashboard">
                  <Icon type="desktop"/>
                  <span>{locale({id: 'App.menu.dashboard'})}</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/test">
                  <Icon type="pushpin"/>
                  <span>{locale({id: 'App.menu.test'})}</span>
                </Link>
              </Menu.Item>
              <SubMenu
                key="sub1"
                title={<span><Icon type="user"/><span>User</span></span>}
              >
                <Menu.Item key="3">Tom</Menu.Item>
                <Menu.Item key="4">Bill</Menu.Item>
                <Menu.Item key="5">Alex</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout className={{'app-content': true, 'open': !this.state.collapsed}}>
            <Header className="app-header">
              <div className="logo">
                {locale({id: 'App.name'})}
              </div>
            </Header>
            <Content className="app-route-view">
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(Main), {
  withRef: true
});
// export default injectIntl(Main, {
//   withRef: true
// });
