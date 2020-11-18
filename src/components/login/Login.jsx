import React from 'react';
import { Row, Col, Card, Form, Button, Input, Space, Typography } from 'antd'

const Login = () => {

  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row justify='center' align='center' style={{ height: '100vh' }}>
      <Col>
        <Card
          style={{ width: 310 }}
          title={
            <Typography.Title
              level={3}
              style={{
                width: '100%',
                textAlign: 'center',
                color: '#03a9f4'
              }}>
              Entrar SAUV
            </Typography.Title>
          }>
          <Row justify='center' align='middle'>
            <Col span={24}>
              <img
                style={{
                  width: 250,
                  height: 250
                }}
                src='/study.svg'
              />
            </Col>
            <Col span={24}>
              <Form
                layout='vertical'
                name="autenticacao"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input size='large' />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password size='large' />
                </Form.Item>

                <Form.Item >
                  <Button style={{ width: '100%' }} size='large' type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}

export default Login;
