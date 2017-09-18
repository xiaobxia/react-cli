import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  //HashRouter，得到的将是localhost/about，没有#
  HashRouter as Router,
  Link,
  Route,
  IndexRoute,
  history
} from 'react-router-dom'

import {
  Menu, Icon, Button, Layout, Breadcrumb
} from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


import {mapStateToProps, mapDispatchToProps} from './store'

import routes from './router'

import User from './module/user'
import HelloWord from './component/helloWorld'


class App extends Component {
  constructor() {
    super();
    //需要绑定上下文
    this.titleClickHandler = this.titleClickHandler.bind(this);
    this.jump = this.jump.bind(this);
  }

  titleClickHandler() {
    //方式1,用这种方式时connect中就不要弄actions了
    //this.props.dispatch(globAction.changeCount(10));
    //注册在了props上
    this.props.actions.changeCount(10);
  }

  state = {
    timer: 0,
    timer2: 0,
    testState: 'testState',
    list: [{name: 'list1.'}, {name: 'list1.'}],
    collapsed: false
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  //生命周期mount
  componentDidMount() {
    // this.timerID = setInterval(
    //   () => this.tick(),
    //   1000
    // );
    // this.timerID2 = setInterval(() => {
    //   this.tick2();
    // }, 1000);
    // this.timerID3 = setInterval(() => {
    //   this.tick3();
    // }, 1000)
  }

  //生命周期销毁前
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    //只会修改timer的值，行为应该是merge
    this.setState({
      timer: this.state.timer + 1
    });
  }

  tick2() {
    //参数，原来的state
    //只会修改timer的值，行为应该是merge
    this.setState((preState) => ({
      timer2: preState.timer2 + 1
    }));
  }

  tick3() {
    this.setState((preState) => ({
      //必须返回新的list，所以不能直接push
      list: [...preState.list, {
        name: 'list1.'
      }]
    }));
  }

  jump() {
    console.log(this)
  }

  render() {
    let {theme} = this.props.glob;
    console.log(this.props.location)
    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
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
            <Menu theme='dark' defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1">
                <Icon type="pie-chart" />
                <span>Option 1</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="desktop" />
                <span>Option 2</span>
              </Menu.Item>
              <SubMenu
                key="sub1"
                title={<span><Icon type="user" /><span>User</span></span>}
              >
                <Menu.Item key="3">Tom</Menu.Item>
                <Menu.Item key="4">Bill</Menu.Item>
                <Menu.Item key="5">Alex</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={<span><Icon type="team" /><span>Team</span></span>}
              >
                <Menu.Item key="6">Team 1</Menu.Item>
                <Menu.Item key="8">Team 2</Menu.Item>
              </SubMenu>
              <Menu.Item key="9">
                <Icon type="file" />
                <span>File</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header className="app-header">
              <div className="logo">
                xiaobxia console
              </div>
            </Header>
            <Content style={{ margin: '0 16px' }}>
              {routes.map(function (item, index) {
                return (<Route key={index} path={item.path} component={item.component}></Route>)
              })}
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              xiaobxia console ©2017 Created by xiaobxia
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
