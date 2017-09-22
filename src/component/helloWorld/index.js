/**
 * Created by xiaobxia on 2017/9/13.
 */
import React, {Component, PropTypes} from 'react'
//import PropTypes from 'prop-types'
//import {connect} from 'react-redux'


class HelloWord extends Component {
  //父组件传递给它的
  static propTypes = {
    address: PropTypes.string
  };

  state = {
    time: new Date(),
    count: 0
  };

  addCount = () => {

    this.setState((preState) => {
      this.props.onChange(preState.count + 1);
      return {
        count: preState.count + 1
      }
    });
  };


  render() {
    //局部的类似于vue中的data
    let {time, count} = this.state;
    //父组件传递给它的
    let {name} = this.props;
    //console.log(this.props)
    return (
      <div>
        <h3>时间{time.toDateString()}</h3>
        <p>计数{count}</p>
        <p>名字{name}</p>
      </div>
    );
  }
}
export default HelloWord;

//TODO 有了connect，就可以省去dispatch，
// export default connect(
// );
