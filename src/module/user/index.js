/**
 * Created by xiaobxia on 2017/9/14.
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class User extends Component {
  constructor() {
    super();
    this.jump = this.jump.bind(this);
  }
  jump() {
    //路由跳转
    this.props.history.push('/index?a=a');
  }
  render() {
    //query在search里
    console.log(this.props.location.search);
    return (
      <div>
        <h3 onClick={this.jump}>routeView</h3>
      </div>
    );
  }
}

export default withRouter(User);
