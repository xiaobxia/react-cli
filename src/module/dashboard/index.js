/**
 * Created by xiaobxia on 2017/9/18.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class Dashboard extends Component {
  render() {
    let locale = this.props.intl.formatMessage;
    return (
      <div></div>
    );
  }
}

export default withRouter(connect()(Dashboard));
