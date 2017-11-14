/**
 * Created by xiaobxia on 2017/11/13.
 */
import React, {PureComponent} from 'react'
import {Icon, Button, Form, Input} from 'antd';
import {injectIntl} from 'react-intl';
import {consoleRender} from 'localUtil/consoleLog'
const FormItem = Form.Item;
class LoginForm extends PureComponent {
  loginHandler = () => {
    const {
      form: {
        getFieldsValue
      },
      onLoginHandler
    } = this.props;
    onLoginHandler(getFieldsValue());
  };
  render() {
    consoleRender('LoginForm render');
    // 渲染多次的原因是，自动填充了两次
    const {
      form: {
        getFieldDecorator
      }
    } = this.props;
    const locale = this.props.intl.formatMessage;
    return (
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
    );
  }
}

export default Form.create()(injectIntl(LoginForm));
