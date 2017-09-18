/**
 * Created by xiaobxia on 2017/9/18.
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class Dashboard extends Component {
  render() {
    //query在search里
    console.log(this.props.location.search);
    return (
      <div>
        <h3>dashboard</h3>
      </div>
    );
  }
}

export default withRouter(Dashboard);
