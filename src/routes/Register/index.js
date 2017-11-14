/**
 * Created by xiaobxia on 2017/11/14.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import {Form, Input, Button, Select, Row, Col, Popover, Progress} from 'antd';
import {appActions} from 'localStore/actions'

const FormItem = Form.Item;

const passwordStatusMap = {
  ok: <p>强度：强</p>,
  pass: <p>强度：中</p>,
  pool: <p>强度：太短</p>
};

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  pool: 'exception'
};


class Register extends Component {
  state = {
    count: 0,
    confirmDirty: false,
    visible: false,
    help: ''
  };

  componentWillReceiveProps(nextProps) {
    // if (nextProps.register.status === 'ok') {
    // }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    let count = 59;
    this.setState({count});
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({count});
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  getPasswordStatus = (value) => {
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'pool';
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields({force: true},
      (err, values) => {
        if (!err) {
          this.props.dispatch({
            type: 'register/submit',
            payload: values
          });
        }
      }
    );
  };

  handleConfirmBlur = (e) => {
    const {value} = e.target;
    this.setState({confirmDirty: this.state.confirmDirty || !!value});
  };

  checkConfirm = (rule, value, callback) => {
    const {form} = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不匹配!');
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    if (!value) {
      this.setState({
        help: '请输入密码！',
        visible: !!value
      });
      callback('error');
    } else {
      this.setState({
        help: ''
      });
      if (!this.state.visible) {
        this.setState({
          visible: !!value
        });
      }
      if (value.length < 6) {
        callback('error');
      } else {
        const {form} = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], {force: true});
        }
        callback();
      }
    }
  };

  renderPasswordProgress = () => {
    const {form} = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus(value);
    return value && value.length
      ? <div>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div> : null;
  };

  render() {
    const {form} = this.props;
    const {getFieldDecorator} = form;
    const {count} = this.state;
    return (
      <div className="register-wrap">
        <h3>注册</h3>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('mail', {
              rules: [{
                required: true, message: '请输入邮箱地址！'
              }, {
                type: 'email', message: '邮箱地址格式错误！'
              }]
            })(
              <Input size="large" placeholder="邮箱"/>
            )}
          </FormItem>
          <FormItem help={this.state.help}>
            <Popover
              content={
                <div style={{padding: '4px 0'}}>
                  {passwordStatusMap[this.getPasswordStatus()]}
                  {this.renderPasswordProgress()}
                  <p style={{marginTop: 10}}>请至少输入 6 个字符。请不要使用容易被猜到的密码。</p>
                </div>
              }
              overlayStyle={{width: 240}}
              placement="right"
              visible={this.state.visible}
            >
              {getFieldDecorator('password', {
                rules: [{
                  validator: this.checkPassword
                }]
              })(
                <Input
                  size="large"
                  type="password"
                  placeholder="至少6位密码，区分大小写"
                />
              )}
            </Popover>
          </FormItem>
          <FormItem>
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: '请确认密码！'
              }, {
                validator: this.checkConfirm
              }]
            })(
              <Input
                size="large"
                type="password"
                placeholder="确认密码"
              />
            )}
          </FormItem>
          <FormItem>
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator('captcha', {
                  rules: [{
                    required: true, message: '请输入验证码！'
                  }]
                })(
                  <Input
                    size="large"
                    placeholder="验证码"
                  />
                )}
              </Col>
              <Col span={8}>
                <Button
                  size="large"
                  disabled={count}
                  onClick={this.onGetCaptcha}
                >
                  {count ? `${count} s` : '获取验证码'}
                </Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Button size="large" type="primary" htmlType="submit">注册</Button>
          </FormItem>
          <Link to="/user/login">使用已有账户登录</Link>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    app: state.app
  }
};
const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActions, dispatch)
});

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(Register));
