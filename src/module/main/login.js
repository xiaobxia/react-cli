/**
 * Created by xiaobxia on 2017/10/18.
 */
import React, {Component} from 'react'
import {Card, Icon, Button, Form, Input} from 'antd';
import {injectIntl} from 'react-intl';
const FormItem = Form.Item;
class AppLogin extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps;
  }

  render() {
    // console.log('Login render');
    // 渲染多次的原因是，自动填充了两次
    const {
      form: {
        getFieldDecorator,
        getFieldsValue
      },
      onLogin
    } = this.props;
    const locale = this.props.intl.formatMessage;
    const loginHandler = () => {
      onLogin(getFieldsValue());
    };
    return (
      <Card title={locale({id: 'App.name'})} bordered={false} className="login-wrap">
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
                    onClick={loginHandler}>
              {locale({id: 'App.login'})}
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}
export default Form.create()(injectIntl(AppLogin, {
  withRef: true
}));
