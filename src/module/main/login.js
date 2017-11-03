/**
 * Created by xiaobxia on 2017/10/18.
 */
import React, {PureComponent} from 'react'
import {Card, Icon, Button, Form, Input, Alert} from 'antd';
import {injectIntl} from 'react-intl';
import {consoleRender} from 'localUtil/consoleLog'
const FormItem = Form.Item;
class AppLogin extends PureComponent {
  state = {
    showError: false,
    errorMsg: ''
  };

  onClose = () => {
    this.setState({
      showError: false,
      errorMsg: ''
    });
  };

  loginHandler = () => {
    const {
      form: {
        getFieldsValue
      },
      onLogin
    } = this.props;
    onLogin(getFieldsValue()).then((data) => {
      if (data) {
        this.setState({
          showError: true,
          errorMsg: data.msg
        });
      }
    });
  };

  render() {
    consoleRender('Login render');
    // 渲染多次的原因是，自动填充了两次
    const {
      form: {
        getFieldDecorator
      }
    } = this.props;
    const locale = this.props.intl.formatMessage;
    return (
      <div className="login-wrap">
        <div className="logo">{locale({id: 'App.name'})}</div>
        {this.state.showError && (<Alert message={this.state.errorMsg} type="error" closable onClose={this.onClose}/>)}
        <Card noHovering={true}>
          <Form className="login-form">
            <FormItem>
              {getFieldDecorator('user', {
                rules: [{required: true, message: 'Please input your username!'}]
              })(
                <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="Username"/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{required: true, message: 'Please input your Password!'}]
              })(
                <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password" placeholder="Password"/>
              )}
            </FormItem>
            <FormItem style={{marginTop: '60px'}}>
              <Button style={{width: '100%'}} type="primary" htmlType="submit" className="login-form-button"
                      onClick={this.loginHandler}>
                {locale({id: 'App.login'})}
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(injectIntl(AppLogin));
