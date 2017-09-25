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

  state = {
    type: 'add'
  };

  render() {
    //query在search里
    console.log(this.props.location.search);
    console.log(this.props.user);
    console.log(this.props.glob);
    return (
      <div>
        <h3>USER</h3>
        {this.state.type === 1 ? (<p>1</p>) : (<p>2</p>)}
      </div>
    );
  }
}

export const mapStateToProps = state => {
  //可以在这筛选state
  //不注入全局的可以防止全局渲染
  return {
    user: state.user,
    glob: state.glob
  }
};

// export const mapDispatchToProps = dispatch => ({
//   //action在此为引入
//   actions: bindActionCreators(globAction, dispatch)
// });


export default connect(
  mapStateToProps
  // mapDispatchToProps
)(withRouter(User))

// export default withRouter(User);
