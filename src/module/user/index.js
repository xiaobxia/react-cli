/**
 * Created by xiaobxia on 2017/9/14.
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class User extends Component {
  constructor(props) {
    super(props);
  }

  changeCountHandler = () => {
  };

  render() {
    //query在search里
    //console.log(this.props.location.search);
    // return super.render();
    //console.log(this.props.glob)
    return (
      <div>
        <p>count</p>
        <h3>routeView</h3>
        <button onClick={this.changeCountHandler}></button>
      </div>
    );
  }
}

export default withRouter(User);
