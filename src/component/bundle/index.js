/**
 * Created by xiaobxia on 2017/9/21.
 */
import React, {Component} from 'react'
import {injectIntl} from 'react-intl';
export default class Bundle extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    this.load(this.props)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }
  load = (props) => {
    this.setState({
      mod: null
    });
    props.load((mod) => {
      this.setState({
        mod: mod.default ? mod.default : mod
      })
    })
  };
  //子模块的国际化在这做
  render() {
    return this.state.mod ? this.props.children(injectIntl(this.state.mod), {
      withRef: true
    }) : null;
  }
}
