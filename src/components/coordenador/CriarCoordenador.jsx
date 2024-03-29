import React from "react";
import { mockCoordenador } from "../../models/coordenador";
import Input from "../Input";
import FormCard from "../FormCard";
import { Form, Button, Select, Col, Row, Space, Modal } from "antd";
import { Usuario } from "../../services/usuario";
import Coordenador from "../../services/coordenador";
import { ROLE } from "../../utils/enum";

const { Option } = Select;

const CriarCoordenador = ({ title, initialValues }) => {
  const isNew = !initialValues?.cpf;
  const [form] = Form.useForm();
  const coordenador = new Coordenador();
  const usuario = new Usuario();

  const onFinish = async (values) => {
    if (isNew) {
      const coorResponse = await coordenador.criar(values).catch((error) => {
        return new Error(error);
      });

      const userResponse = await usuario
        .criar({
          username: values.username,
          senha: values.password,
          tipo: ROLE.coordenador,
        })
        .catch((error) => {
          return new Error(error);
        });
      if (coorResponse instanceof Error || userResponse instanceof Error) {
        if (coorResponse instanceof Error)
          Modal.error({ title: "Erro ao criar o coordenador" });
        if (userResponse instanceof Error)
          Modal.error({ title: "Erro ao criar o usuário" });
      } else Modal.success({ title: `Coordenador foi criado com sucesso!` });
    } else {
      const coorResponse = await coordenador
        .atualizar(values)
        .catch((error) => {
          return new Error(error);
        });

      if (coorResponse instanceof Error)
        Modal.error({ title: "Erro ao atualizar coordenador " });
      else Modal.success({ title: `Coordenador foi atualizado com sucesso!` });
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue(mockCoordenador);
  };

  return (
    <FormCard
      title={title}
      tip="Cadastro de coordenador, assim que o registro for salvo com sucesso, este usuário será posível realizar login"
    >
      <Form
        initialValues={initialValues}
        layout="vertical"
        form={form}
        name="criar-usuario"
        onFinish={onFinish}
      >
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="username"
              label="Nome de Usuário"
              rules={[{ required: isNew, message: "Obrigatório" }]}
            >
              <Input disabled={!isNew} placeholder="Usuário" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="password"
              label="Senha"
              rules={[{ required: isNew, message: "Obrigatório" }]}
            >
              <Input disabled={!isNew} placeholder="Senha" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="primNome"
              label="Primeiro Nome"
              rules={[{ required: true, message: "Obrigatório" }]}
            >
              <Input placeholder="Maria" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="sobrenome"
              label="Sobrenome"
              rules={[{ required: true, message: "Obrigatório" }]}
            >
              <Input placeholder="Silva" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="genero"
              label="Gênero"
              rules={[{ required: true, message: "Obrigatório" }]}
            >
              <Select size="large" placeholder="Selecione o gênero" allowClear>
                <Option value="masculino">Masculino</Option>
                <Option value="feminino">Feminino</Option>
                <Option value="outro">Outro</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="cpf"
              label="CPF"
              rules={[{ required: true, message: "Obrigatório" }]}
            >
              <Input disabled={!isNew} placeholder="Digite somente números" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="rg" label="RG">
              <Input disabled={!isNew} placeholder="Digite somente números" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                { required: true, message: "Obrigatório" },
                { type: "email", message: "E-mail inválido" },
              ]}
            >
              <Input placeholder="maria@email.com" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="telefone"
              label="Telefone Celular"
              rules={[{ required: true, message: "Obrigatório" }]}
            >
              <Input placeholder="(DD)99999-9999" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="logradouro"
              label="Logradouro"
              rules={[{ required: true, message: "Obrigatório" }]}
            >
              <Input placeholder="Avenida são paulo, 111" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="pais"
              label="País"
              rules={[{ required: true, message: "Obrigatório" }]}
            >
              <Input placeholder="Brasil" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="estado"
              label="Estado"
              rules={[{ required: true, message: "Obrigatório" }]}
            >
              <Input placeholder="Paraná" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="cidade"
              label="Cidade"
              rules={[{ required: true, message: "Obrigatório" }]}
            >
              <Input placeholder="Maringá" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Space size="small">
            <Button shape="round" size="large" type="primary" htmlType="submit">
              Enviar
            </Button>
            <Button
              shape="round"
              size="large"
              htmlType="button"
              onClick={onReset}
            >
              Resetar
            </Button>
            <Button
              shape="round"
              size="large"
              type="link"
              htmlType="button"
              onClick={onFill}
            >
              Preencher formulário
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </FormCard>
  );
};
export default CriarCoordenador;
