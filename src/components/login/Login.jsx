import React from 'react';
import { Row, Col, Card, Form, Button, Input, Typography, message } from 'antd'
import { users } from '../../models/users'
import { useHistory } from 'react-router-dom'
import store, { loginUser } from '../../redux/login';

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
    <Card
      style={{
        width: 310,
        position: 'absolute',
        right: '50%',
        top: '50%',
        marginRight: -155,
        marginTop: -309
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
  );
}

export default Login;
