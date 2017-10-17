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

  shouldComponentUpdate(props, newState) {
    console.log('是否更新');
    //返回false就不更新
    return true;
  }

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
    //query在search里
    //console.log(this.props.location.search);
    let locale = this.props.intl.formatMessage;
    return (
      <div>
        <h3 className="tittle">dashboard</h3>
        <p>插入html</p>
        <p>国际化{locale({id: 'InjectExample.alert'})}</p>
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

export default withRouter(Dashboard);
