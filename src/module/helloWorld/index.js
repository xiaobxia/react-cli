/**
 * Created by xiaobxia on 2017/9/13.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
//import {connect} from 'react-redux'


class HelloWord extends Component {
  //父组件传递给它的
  static propTypes = {
    address: PropTypes.string
  };

  state = {
    time: new Date()
  };

  render() {
    //局部的类似于vue中的data
    let {time} = this.state;
    //父组件传递给它的
    let {address} = this.props;
    console.log(this.props)
    return (
      <div>
        <h3>时间{time.toDateString()}</h3>
        <p>地址{address}</p>
      </div>
    );
  }
}

export default HelloWord;

//TODO 有了connect，就可以省去dispatch，
// export default connect(
// );
