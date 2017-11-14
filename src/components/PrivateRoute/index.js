/**
 * Created by xiaobxia on 2017/10/19.
 */
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {consoleRender} from 'localUtil/consoleLog'
//需要鉴权
const PrivateRoute = ({component: RouteComponent, ...rest}) => {
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
};

const mapStateToProps = state => {
  return {
    app: state.app
  }
};

export default connect(mapStateToProps)(PrivateRoute);
