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
import {FormattedMessage, injectIntl} from 'react-intl';

import {
  Menu, Icon, Button, Layout, Breadcrumb
} from 'antd';
const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;

import {mapStateToProps, mapDispatchToProps} from './store'
import routes from './router'

class App extends Component {
  constructor() {
    super();
    //需要绑定上下文
    this.titleClickHandler = this.titleClickHandler.bind(this);
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
    this.setState({collapsed});
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
    //TODO setState中函数的参数
    this.setState((preState, props) => ({
      //必须返回新的list，所以不能直接push
      list: [...preState.list, {
        name: 'list1.'
      }]
    }));
  }

  render() {
    let locale = this.props.intl.formatMessage;
    return (
      <Router>
        <Layout style={{minHeight: '100vh'}}>
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
              {/*组件中的命名空间*/}
              <Menu.Item key="1">
                <Icon type="pie-chart"/>
                <span>Option 1</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="desktop"/>
                <span>Option 2</span>
              </Menu.Item>
              <SubMenu
                key="sub1"
                title={<span><Icon type="user"/><span>User</span></span>}
              >
                <Menu.Item key="3">Tom</Menu.Item>
                <Menu.Item key="4">Bill</Menu.Item>
                <Menu.Item key="5">Alex</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={<span><Icon type="team"/><span>Team</span></span>}
              >
                <Menu.Item key="6">Team 1</Menu.Item>
                <Menu.Item key="8">Team 2</Menu.Item>
              </SubMenu>
              <Menu.Item key="9">
                <Icon type="file"/>
                <span>File</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header className="app-header">
              <div className="logo" onClick={this.titleClickHandler}>
                xiaobxia console
              </div>
            </Header>
            <Content style={{margin: '0 16px'}}>
              {routes.map(function (item, index) {
                return (<Route exact key={index} path={item.path} component={item.component}></Route>)
              })}
            </Content>
            <Footer style={{textAlign: 'center'}}>
              {/*不实用，不用组件的方式更好*/}
              <FormattedMessage id={'App.datePicker.title'}/>
              xiaobxia console ©2017 Created by xiaobxia
              {locale({id: 'App.datePicker.title'})}
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(App), {
  withRef: true
})
