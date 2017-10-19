/**
 * Created by xiaobxia on 2017/10/18.
 */
import React, {Component} from 'react'
import {Card, Icon, Button, Form, Input} from 'antd';
import {connect} from 'react-redux'
import {appActions} from 'localStore/actions'
const FormItem = Form.Item;
const AppLogin = (props) => {
  const {
    form: {
      getFieldDecorator
    },
    title,
    loginName,
    appActions
  } = props;
  console.log(props);
  const loginHandler = () => {
  };

  return (
    <Card title={title} bordered={false} className="login-wrap">
      <Form className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
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
          <Button style={{width: '100%'}} type="primary" htmlType="submit" className="login-form-button" onClick={loginHandler}>
            {loginName}
          </Button>
        </FormItem>
      </Form>
    </Card>
  );
};
export default Form.create()(connect()(AppLogin));
