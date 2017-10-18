/**
 * Created by xiaobxia on 2017/9/18.
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import HelloWord from 'localComponent/helloWorld'

class Dashboard extends Component {
  //这种写法不用bind
  jumpToUser = () => {
    //路由跳转
    this.props.history.push('/user/index');
  };
  state = {
    input1Value: 0
  };

  input1ValueChange = (e) => {
    this.setState({
      input1Value: e.target.value
    });
    console.log(this.refs.input1.value)
  };

  changeChildrenData = () => {
    this.refs.helloword.addCount();
  };

  childrenChange = (newValue) => {
    console.log(newValue)
  };

  render() {
    console.log('Dashboard props', this.props);
    //query在search里
    //console.log(this.props.location.search);
    let locale = this.props.intl.formatMessage;
    return (
      <div>
        <h3 className="tittle">dashboard</h3>
        <p>插入html</p>
        {/* 插入html */}
        <p dangerouslySetInnerHTML={{__html: '<p>我是一段html</p>'}}></p>
        <button onClick={this.changeChildrenData}>改变子组件</button>
        <HelloWord ref="helloword" name="xiaobxia" onChange={this.childrenChange}></HelloWord>
        <p>input1: {this.state.input1Value}</p>
        {/*for属性也被hook*/}
        <label htmlFor="input1"></label>
        <input id="input1" ref="input1" value={this.state.input1Value} onChange={this.input1ValueChange}></input>
        <button onClick={this.jumpToUser}>去user</button>
      </div>
    );
  }
}

export default withRouter(connect()(Dashboard));
