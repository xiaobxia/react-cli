/**
 * Created by xiaobxia on 2017/9/13.
 */
import React, {Component}from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'


export default class HelloWord extends Component {
  //父组件传递给它的
  static propTypes = {
    address: PropTypes.string.isRequired
  };

  state = {
    time: new Date()
  };

  render() {
    //局部的类似于vue中的data
    let {time} = this.state;
    //父组件传递给它的
    //this.props;
    return (<h3>时间{time.toDateString()}</h3>);
  }
}

//TODO 有了connect，就可以省去dispatch，
export default connect(
);
