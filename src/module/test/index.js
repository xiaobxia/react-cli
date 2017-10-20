/**
 * Created by xiaobxia on 2017/10/18.
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import HelloWord from 'localComponent/helloWorld'

class Test extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    type: 'add'
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

  jumpToDashboard = () => {
    //路由跳转
    this.props.history.push('/dashboard');
  };

  render() {
    console.log('Test props', this.props);
    //query在search里
    let locale = this.props.intl.formatMessage;
    console.log(this.props.location.search);
    console.log(this.props.user);
    console.log(this.props.glob);
    return (
      <div>
        <h3>TEST模块</h3>
        <div>
          <p>测试组件</p>
          <HelloWord />
        </div>
        <div>
          <p>测试国际化</p>
          <p>app的名字是: {locale({id: 'App.name'})}</p>
        </div>
        <div>
          <p>测试路由</p>
          <div>
            <button onClick={this.jumpToDashboard}>{locale({id: 'App.menu.dashboard'})}</button>
          </div>
        </div>
        <div>
          <p dangerouslySetInnerHTML={{__html: '<p>我是一段原生html</p>'}}/>
        </div>
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
)(withRouter(Test));
