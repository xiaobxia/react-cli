import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {HashRouter as Router, Link, Prompt} from 'react-router-dom'
import {Icon, Layout} from 'antd';
import {injectIntl} from 'react-intl';
import AppLogin from './login'
import AppMenu from './menu'
import AppHeader from './header'
const {Header, Content, Sider} = Layout;
import {appActions} from 'localStore/actions'

class Main extends Component {
  constructor() {
    super();
  }

  state = {
    collapsed: false,
    menuProps: {}
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
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

  // 这一层在vue中是看不到的，vue帮你做了
  render() {
    // console.log('App props', this.props);
    // console.log('App state', this.state);
    let props = this.props;
    let store = this.props.app;
    //防止页面一闪
    if (store.isChecking) {
      return null;
    }
    let ifLogin = store.loginUser === null;
    if (ifLogin) {
      return (<AppLogin onLogin={props.appActions.appLogin}/>);
    } else {
      let state = this.state;
      return (
        <Router>
          <Layout>
            <Sider
              trigger={null}
              collapsible
              className="app-sider"
              collapsed={state.collapsed}
            >
              <div className="trigger-wrap">
                <Icon
                  className="trigger"
                  type={state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggleCollapsed}
                />
              </div>
              <AppMenu {...state.menuProps}/>
            </Sider>
            <Layout className={{'app-content': true, 'open': !state.collapsed}}>
              <Header className="app-header">
                <AppHeader userName={store.loginUser.userName} onLogout={props.appActions.appLogout}/>
              </Header>
              <Content className="app-route-view">
                {props.children}
              </Content>
            </Layout>
          </Layout>
        </Router>
      );
    }
  }
}


export const mapStateToProps = state => {
  return {
    app: state.app
  }
};
const mapDispatchToProps = dispatch => ({
  //action在此为引入
  appActions: bindActionCreators(appActions, dispatch)
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Main), {
  withRef: true
});
