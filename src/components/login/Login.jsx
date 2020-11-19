import React from 'react';
import { Row, Col, Card, Form, Button, Input, Typography, message, Space } from 'antd'
import { users } from '../../models/users'
import { useHistory } from 'react-router-dom'
import store, { loginUser } from '../../redux/auth';

const Login = () => {
  const history = useHistory()

  const handleLogin = ({ usuario, senha }) => {

    const filter = users.filter(user => user.senha === senha && user.usuario === usuario)
    if (filter.length === 0) {
      return message.error('Usuário ou senha estão incorretas')
    }
    store.dispatch(loginUser({ usuario, senha }))
    history.push('/visualizar/usuarios');
  };

  return (
    <Row align='middle' justify='space-between' style={{ height: '100vh' }}>
      <Col
        span={14}
        style={{
          background: '#e1f5fe',
          height: '100%',
          width: '100%',
          borderTopRightRadius: '5%',
          borderBottomRightRadius: '100%'
        }}>
        <Row align='middle' justify='center'>
          <Col span={24}>
            <Row justify='center'>
              <Col>
                <Typography.Title level={2}>
                  Bem-vindo ao SAUV!
                </Typography.Title>
              </Col>
            </Row>
          </Col>
          <Col>
            <img
              style={{ height: 400, width: 400 }}
              alt='Sauv LOGO'
              src='/logo.png'
            />
          </Col>
        </Row>
      </Col>
      <Col span={10}>
        <Row justify='center'>
          <Col>
            <Card
              style={{
                width: 310,
              }}
              title={
                <Typography.Title
                  level={3}
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    color: '#03a9f4'
                  }}>
                  SAUV
                </Typography.Title>
              }>
              <Row justify='center' align='middle'>
                <Col span={24}>
                  <img
                    style={{
                      width: 250,
                      height: 250
                    }}
                    alt='Sauv login screen'
                    src='/study.svg'
                  />
                </Col>
                <Col span={24}>
                  <Form
                    layout='vertical'
                    name="autenticacao"
                    initialValues={{ remember: true }}
                    onFinish={handleLogin}
                  >
                    <Form.Item
                      label="Usuário"
                      name="usuario"
                      rules={[{ required: true, message: 'Nome de usuário obrigatório!', }]}
                    >
                      <Input size='large' />
                    </Form.Item>

                    <Form.Item
                      label="Senha"
                      name="senha"
                      rules={[{ required: true, message: 'Senha obrigatória!' },
                      ]}
                    >
                      <Input.Password size='large' />
                    </Form.Item>

                    <Form.Item >
                      <Button style={{ width: '100%' }} size='large' type="primary" htmlType="submit">
                        Entrar
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row >
  );
}

export default Login;
