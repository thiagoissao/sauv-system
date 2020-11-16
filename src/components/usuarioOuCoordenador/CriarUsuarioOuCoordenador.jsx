import React from 'react'
import { mockUsuarioCoordenador } from '../../models/usuarioOuCoordenador'
import {
  Form,
  Input,
  Button,
  Select,
  Col,
  Row,
  Space,
  Modal,
  Typography,
  Divider
} from 'antd';

const { Option } = Select;

const CriarUsuarioOuCoordenador = ({ tipo = 'Usuário' }) => {
  const [form] = Form.useForm();

  const onFinish = values => {
    Modal.success({
      content: `${tipo} ${values['primeiro-nome']} criado com sucesso!`,
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue(mockUsuarioCoordenador);
  };

  return (
    <>
      <Row gutter={24}>
        <Col span={24}>
          <Divider orientation="left" plain>
            <Typography.Title level={2}>Cadastro de {tipo}</Typography.Title>
          </Divider>
        </Col>
      </Row>
      <Form layout='vertical' form={form} name="criar-usuario" onFinish={onFinish}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="primeiro-nome" label="Primeiro Nome" rules={[{ required: true, message: 'Obrigatório' }]}>
              <Input placeholder='Maria' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="ultimo-nome" label="Sobrenome" rules={[{ required: true, message: 'Obrigatório' }]}>
              <Input placeholder='Silva' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="genero" label="Gênero" rules={[{ required: true, message: 'Obrigatório' }]}>
              <Select
                placeholder="Selecione o gênero"
                allowClear
              >
                <Option value="masculino">Masculino</Option>
                <Option value="feminino">Feminino</Option>
                <Option value="outro">Outro</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="cpf" label="CPF" rules={[{ required: true, message: 'Obrigatório' }]}>
              <Input placeholder='Digite somente números' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="rg" label="RG">
              <Input placeholder='Digite somente números' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                { required: true, message: 'Obrigatório' },
                { type: 'email', message: 'E-mail inválido' }
              ]}>
              <Input placeholder='maria@email.com' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="celular" label="Telefone Celular" rules={[{ required: true, message: 'Obrigatório' }]}>
              <Input placeholder='(DD)99999-9999' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="logradouro" label="Logradouro" rules={[{ required: true, message: 'Obrigatório' }]}>
              <Input placeholder='Avenida são paulo, 111' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="pais" label="País" rules={[{ required: true, message: 'Obrigatório' }]}>
              <Input placeholder='Brasil' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="estado" label="Estado" rules={[{ required: true, message: 'Obrigatório' }]}>
              <Input placeholder='Paraná' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="cidade" label="Cidade" rules={[{ required: true, message: 'Obrigatório' }]}>
              <Input placeholder='Maringá' />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Space size='small'>
            <Button shape='round' size='large' type="primary" htmlType="submit">
              Submit
          </Button>
            <Button shape='round' size='large' htmlType="button" onClick={onReset}>
              Reset
        </Button>
            <Button shape='round' size='large' type="link" htmlType="button" onClick={onFill}>
              Fill form
        </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};
export default CriarUsuarioOuCoordenador
