/**
 * Created by xiaobxia on 2017/9/21.
 */
import React, {Component} from 'react'
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
    console.log('ininin')
    console.log(props.load)
    props.load((mod) => {
      console.log(mod)
      this.setState({
        mod: mod.default ? mod.default : mod
      })
    })
  };
  render() {
    console.log(this.state.mod)
    return this.state.mod ? this.props.children(this.state.mod) : null;
  }
}
