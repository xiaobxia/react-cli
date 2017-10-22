/**
 * Created by xiaobxia on 2017/10/18.
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import qs from 'qs'
import HelloWord from 'localComponent/helloWorld'

class Test extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    type: 1
  };

  componentWillMount() {
    console.log('将要装载Test');
  }

  componentDidMount() {
    console.log('装载Test完成');
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('Test将要更新');
    console.log(nextProps);
    console.log(nextState);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Test更新完成');
    console.log(prevProps);
    console.log(prevState);
  }

  componentWillUnmount() {
    console.log('将要卸载Test');
  }

  shouldComponentUpdate(props, newState) {
    console.log('是否更新Test');
    //返回false就不更新
    return true;
  }

  jumpToDashboard = () => {
    //路由跳转
    let query = qs.stringify({
      name: 'xiaobxia'
    });
    this.props.history.push('/dashboard?' + query);
  };

  render() {
    console.log('Test props', this.props);
    let locale = this.props.intl.formatMessage;
    //query在search里
    console.log('url query', qs.parse(this.props.location.search.slice(1)));
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
          <p>原生html</p>
          <div>
            <p dangerouslySetInnerHTML={{__html: '<p>我是一段原生html</p>'}}/>
          </div>
        </div>
        <div>
          <p>条件渲染</p>
          <div>
            {this.state.type === 1 ? (<p>1</p>) : (<p>2</p>)}
          </div>
        </div>
      </div>
    );
  }
}

// export const mapDispatchToProps = dispatch => ({
//   //action在此为引入
//   actions: bindActionCreators(globAction, dispatch)
// });


export default connect()(withRouter(Test));
