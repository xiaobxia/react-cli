import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
  //HashRouter，得到的将是localhost/about，没有#
  HashRouter as Router,
  Route,
  Link,
  IndexRoute
} from 'react-router-dom'

import * as globAction from './store/actions';


import HelloWord from './module/helloWorld'


class App extends Component {
  constructor() {
    super();
    //需要绑定上下文
    this.titleClickHandler = this.titleClickHandler.bind(this);
  }

  titleClickHandler() {
    //方式1,用这种方式时connect中就不要弄actions了
    //this.props.dispatch(globAction.changeCount(10));
    //注册在了props上
    this.props.actions.changeCount(10);
  }

  state = {
    timer: 0,
    timer2: 0,
    testState: 'testState',
    list: [{name: 'list1.'}, {name: 'list1.'}]
  };
  //生命周期mount
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
    this.timerID2 = setInterval(() => {
      this.tick2();
    }, 1000);
    this.timerID3 = setInterval(() => {
      this.tick3();
    }, 1000)
  }

  //生命周期销毁前
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    //只会修改timer的值，行为应该是merge
    this.setState({
      timer: this.state.timer + 1
    });
  }

  tick2() {
    //参数，原来的state
    //只会修改timer的值，行为应该是merge
    this.setState((preState) => ({
      timer2: preState.timer2 + 1
    }));
  }

  tick3() {
    this.setState((preState) => ({
      //必须返回新的list，所以不能直接push
      list: [...preState.list, {
        name: 'list1.'
      }]
    }));
  }

  render() {
    console.log(this.props)
    return (
      <Router>
        {/* Router中只能有一个子元素*/}
        <div>
          <ul>
            {/*列表渲染，必须有key*/}
            {this.state.list.map((item, index) => {
              return (<p key={index}>{item.name + index}</p>);
            })}
          </ul>
          <p>{this.state.testState}</p>
          {/*获取react自己的state，相当于vue的data*/}
          <p>timer: {this.state.timer}</p>
          <p>timer2: {this.state.timer2}</p>
          {/*条件渲染*/}
          {this.props.getCount === 1 ? <HelloWord address="1"/> : <HelloWord address="10"/>}
          <h3 onClick={this.titleClickHandler}>react{this.props.getCount}</h3>
          <ul>
            {/* Link需要在Router中使用*/}
            <li><Link to="/about">About</Link></li>
            <li><Link to="/inbox">Inbox</Link></li>
          </ul>
          {/* 当 url 为/时渲染 */}
          <HelloWord address="漳"/>
          {/* 路由组件不能传props*/}
          <Route path="/inbox" component={HelloWord}></Route>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  //可以在这筛选state
  let localState = state.glob;
  return {
    getCount: localState.count
  }
};

const mapDispatchToProps = dispatch => ({
  //action在此为引入
  actions: bindActionCreators(globAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
