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
    this.props.actions.changeCount(10);
  }

  render() {
    console.log(this.props)
    return (
      <Router>
        {/* Router中只能有一个子元素*/}
        <div>
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

const mapStateToProps = state => ({
  getCount: state.glob.count
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(globAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)


//TODO 有了connect，就可以省去dispatch，
// export default connect(
// );
