import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {HashRouter as Router, Link, Prompt} from 'react-router-dom'
import {Icon, Layout, Spin} from 'antd';
import {injectIntl} from 'react-intl';
import AppLogin from './login'
import AppMenu from './menu'
import AppHeader from './header'
import ModelLogin from './modelLogin'
const {Header, Content, Sider} = Layout;
import {appActions} from 'localStore/actions'
import {consoleRender} from 'localUtil/consoleLog'

class Main extends PureComponent {
  constructor() {
    super();
  }

  state = {
    menuProps: {}
  };

  toggleCollapsed = () => {
    this.props.appActions.appToggleCollapsed();
  };

  componentWillMount() {
    // console.log('main will mount');
    this.props.appActions.appCheckLogin();
    let locale = this.props.intl.formatMessage;
    const menuProps = {
      menus: [
        {
          path: '/dashboard',
          icon: 'desktop',
          name: locale({id: 'App.menu.dashboard'}),
          key: 1
        },
        {
          path: '/test',
          icon: 'pushpin',
          name: locale({id: 'App.menu.test'}),
          key: 2
        }
      ],
      menusMap: {
        '/': '1',
        '/home': '1',
        '/dashboard': '1',
        '/test': '2'
      }
    };
    this.setState({
      menuProps
    });
  }

  //生命周期mount
  componentDidMount() {
  }

  //生命周期销毁前
  componentWillUnmount() {
  }

  render() {
    consoleRender('App render');
    // console.log('App props', this.props);
    // console.log('App state', this.state);
    let props = this.props;
    let store = this.props.app;
    //防止页面一闪
    if (store.isGlobLoading) {
      return (
        <div className="glob-loading-wrap">
          <Spin size="large"/>
        </div>
      );
    }
    let ifLogin = store.loginUser === null;
    if (ifLogin) {
      return (<AppLogin onLogin={props.appActions.appLogin}/>);
    } else {
      let state = this.state;
      return (
        <Router>
          <div className="app-main">
            <Layout>
              <Sider
                trigger={null}
                collapsible
                className="app-sider"
                collapsed={store.collapsed}
              >
                <AppMenu {...state.menuProps}/>
                <div className="trigger-wrap">
                  <Icon
                    className="trigger"
                    type={store.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggleCollapsed}
                  />
                </div>
              </Sider>
              {/*ant内部有classnames所以能直接用，原生的标签与要这个库*/}
              <Layout className={{'app-content': true, 'open': !store.collapsed}}>
                <Header className="app-header">
                  <AppHeader
                    userName={store.loginUser.userName}
                    onLogout={props.appActions.appLogout}
                  />
                </Header>
                <Content className="app-route-view">
                  {props.children}
                </Content>
                <ModelLogin
                  onLogin={props.appActions.appInsetLogin}
                  onHide={props.appActions.appHideGlobLogin}
                  visible={store.showGlobLogin}
                />
              </Layout>
            </Layout>
          </div>
        </Router>
      );
    }
  }
}


const mapStateToProps = state => {
  return {
    app: state.app
  }
};
const mapDispatchToProps = dispatch => ({
  //action在此为引入
  appActions: bindActionCreators(appActions, dispatch)
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Main));
