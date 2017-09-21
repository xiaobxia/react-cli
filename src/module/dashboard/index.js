/**
 * Created by xiaobxia on 2017/9/18.
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class Dashboard extends Component {
  //这种写法不用bind
  jumpToUser = () => {
    //路由跳转
    this.props.history.push('/user/index');
  };
  state = {
    input1Value: 0
  };

  componentWillMount() {
    console.log('将要装载组件');
  }

  componentDidMount() {
    console.log('装载组件完成');
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('组件将要更新');
    console.log(nextProps);
    console.log(nextState);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('组件更新完成');
    console.log(prevProps);
    console.log(prevState);
  }

  componentWillUnmount() {
    console.log('将要卸载组件');
  }

  input1ValueChange = (e) => {
    this.setState({
      input1Value: e.target.value
    });
    console.log(this.refs.input1.value)
  };

  render() {
    //query在search里
    //console.log(this.props.location.search);
    return (
      <div>
        <h3>dashboard</h3>
        <p>input1: {this.state.input1Value}</p>
        <input ref="input1" value={this.state.input1Value} onChange={this.input1ValueChange}></input>
        <button onClick={this.jumpToUser}>去user</button>
      </div>
    );
  }
}

export default withRouter(Dashboard);
