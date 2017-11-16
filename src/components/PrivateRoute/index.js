/**
 * Created by xiaobxia on 2017/10/19.
 */
import React, {PureComponent} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {Spin} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import {consoleRender} from 'localUtil/consoleLog'
import {appActions} from 'localStore/actions'
//需要鉴权
class PrivateRoute extends PureComponent {
  componentWillMount() {
    this.props.appActions.appCheckLogin();
  }

  render() {
    let store = this.props.app;
    //防止页面一闪
    if (store.isGlobLoading || !store.checkLoginEnd) {
      return (
        <div className="glob-loading-wrap">
          <Spin size="large"/>
        </div>
      );
    }
    const {component: RouteComponent, ...rest} = this.props;
    consoleRender('PrivateRoute render');
    const app = rest.app;
    return (
      <Route {...rest} render={props => {
        if (app.loginUser !== null) {
          return (<RouteComponent {...props}/>);
        } else {
          return (<Redirect to={{
            pathname: '/user/login'
          }}/>);
        }
      }}/>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
