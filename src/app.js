import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  //HashRouter，得到的将是localhost/about，没有#
  HashRouter as Router,
  Route,
  Link,
  IndexRoute,
  history
} from 'react-router-dom'

import {
  Menu, Icon, Button, Layout, Breadcrumb
} from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


import {mapStateToProps, mapDispatchToProps} from './store'

import User from './module/user'
import HelloWord from './module/helloWorld'


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
              <div>
                <Route path="/about" component={User}></Route>
                <p onClick={this.jump}>路由js跳转</p>
                <ul>
                  {/*列表渲染，必须有key*/}
                  {this.state.list.map((item, index) => {
                    return (<p key={index}>{item.name + index}</p>);
                  })}
                </ul>
                <p>{this.state.testState}</p>
                {/*获取react自己的state，相当于vue的data*/}
                <p>timer: {this.state.timer}</p>
                <p>timer2: {this.state.timer2}</p>
                {/*条件渲染*/}
                {this.props.glob.count === 1 ? <HelloWord address="1"/> : <HelloWord address="10"/>}
                <h3 onClick={this.titleClickHandler}>react{this.props.glob.count}</h3>
                <ul>
                  {/* Link需要在Router中使用*/}
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/inbox">Inbox</Link></li>
                </ul>
                {/* 当 url 为/时渲染 */}
                <HelloWord address="漳"/>
                {/* 路由组件不能传props*/}
                <Route path="/inbox" component={HelloWord}></Route>
              </div>
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
