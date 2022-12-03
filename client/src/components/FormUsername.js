import React, {useCallback} from 'react';
import {Button, Form, Icon, Input} from "antd";
import styled from "@emotion/styled";

const WrapperForm = styled.div`
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.04);
  border-radius: 5px;
  display: block;
  width: 300px;
  height: 200px;
  margin-top: 15%;
  padding-top: 50px;
  background-color: #FFFFFF;
  padding-left: 20px;
`;

const FormUsername = ({ form, successValidation }) => {
  const {getFieldDecorator, getFieldError, isFieldTouched} = form;
  const usernameError = isFieldTouched('username') && getFieldError('username');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (values.username === undefined) return;
      if (!err) {
        successValidation(values);
      }
    });
  }, [form]);

  return (
    <WrapperForm>
      <Form layout="inline" onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column"}}>
        <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''} style={{display:"flex", justifyContent:"center"}}>
          {getFieldDecorator('username', {
            rules: [{required: false}],
          })(
            <Input
              prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item style={{marginTop: "30px", display: "flex", justifyContent: "center"}}>
          <Button type="primary" htmlType="submit">
            Join to chat!
          </Button>
        </Form.Item>
      </Form>
    </WrapperForm>
  )
}

const UsernameForm = Form.create({name: 'set_username'})(FormUsername);

export default UsernameForm;