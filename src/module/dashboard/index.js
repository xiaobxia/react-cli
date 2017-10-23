/**
 * Created by xiaobxia on 2017/9/18.
 */
import React, {Component} from 'react'
import {Alert} from 'antd';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {consoleRender} from 'localUtil/consoleLog'

//路由自动包裹intl
class Dashboard extends Component {
  //生命周期mount
  componentDidMount() {
    console.log('Dashboard mount');
  }
  render() {
    consoleRender('Dashboard render');
    let locale = this.props.intl.formatMessage;
    return (
      <Alert message={(<h2>
        <span>{locale({id: 'App.hello'})}, </span>
        <span>{this.props.app.loginUser.userName}</span>
      </h2>)} type="success" />
    );
  }
}

const mapStateToProps = state => {
  return {
    app: state.app
  }
};

export default withRouter(connect(mapStateToProps)(Dashboard));
