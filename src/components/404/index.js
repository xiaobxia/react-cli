/**
 * Created by xiaobxia on 2017/11/16.
 */
import React, {PureComponent} from 'react'
import {Alert} from 'antd';
import {consoleRender} from 'localUtil/consoleLog'

class Exception404 extends PureComponent {
  render() {
    consoleRender('Exception404 render');
    return (
      <img src="/static/404.png" alt=""/>
    );
  }
}

export default Exception404;
