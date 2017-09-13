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


import HelloWord from './module/helloWorld'


export default class App extends Component {

  render() {
    return (
      <Router>
        {/* Router中只能有一个子元素*/}
        <div>
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

//TODO 有了connect，就可以省去dispatch，
// export default connect(
// );
