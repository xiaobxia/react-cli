import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {HashRouter as Router, Link, Prompt} from 'react-router-dom'
import {injectIntl} from 'react-intl';
import {Icon, Layout} from 'antd';
import AppLogin from './login'
import AppMenu from './menu'
const {Header, Content, Sider} = Layout;
import {appActions} from 'localStore/actions'

// import {mapStateToProps, mapDispatchToProps} from '../../store'

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
    this.props.appActions.appCheckLogin();
    console.log('main will mount');
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
    let ifLogin = true;
    console.log('App props', this.props);
    console.log('App state', this.state);
    let locale = this.props.intl.formatMessage;
    return (
      ifLogin ? (<AppLogin title={locale({id: 'App.name'})} loginName={locale({id: 'App.login'})}/>) : (
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
              <AppMenu {...this.state.menuProps}/>
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
      )
    );
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
