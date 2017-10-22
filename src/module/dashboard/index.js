/**
 * Created by xiaobxia on 2017/9/18.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

//路由自动包裹intl
class Dashboard extends Component {
  //生命周期mount
  componentDidMount() {
    console.log('Dashboard mount');
  }
  render() {
    let locale = this.props.intl.formatMessage;
    return (
      <h2>
        <span>{locale({id: 'App.hello'})}, </span>
        <span>{this.props.app.loginUser.userName}</span>
      </h2>
    );
  }
}

const mapStateToProps = state => {
  return {
    app: state.app
  }
};

export default withRouter(connect(mapStateToProps)(Dashboard));
