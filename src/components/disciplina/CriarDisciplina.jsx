import Input from '../Input'
import React, { useState, useEffect } from 'react'
import FormCard from '../FormCard'
import Disciplina from '../../services/disciplinas'

import {
  Form,
  Button,
  Col,
  Row,
  Space,
  Modal,
} from 'antd';

const CriarDisciplinas = ({ title, initialValues, id }) => {
  const [form] = Form.useForm();
  const disciplina = new Disciplina();

  const onFinish = values => {
    if (id) values.id = id
    disciplina.save(values)
      .then(response => {
        if (id) {
          Modal.success({
            title: `Atualização da disciplina ${values['nomeDisciplina']} realizada com sucesso!`,
          });
        } else {
          Modal.success({
            title: `Cadastro da disciplina ${values['nomeDisciplina']} realizada com sucesso!`,
          });
        }
      })
      .catch(error => {
        if (error && error.response && error.response.data) {
          console.log(error.response.data)
          Modal.error({
            title: `Erro ao criar a disciplina!`,
            content: `${error.response.data.message}`,
          });
        } else {
          Modal.error({
            title: `Erro ao criar a disciplina!`,
          });
        }
      })
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      'nomeDisciplina': "Matemática",
      'cargaHoraria': "68",
    });
  };

  return (
    <FormCard 
      tip='Preencha os dados abaixo para criar uma disciplina nova'
      title={title}>
      <Form layout='vertical' form={form} name="nomeDisciplina" onFinish={onFinish} initialValues={initialValues}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="nomeDisciplina" label="Nome Disciplina" rules={[{ required: true, message: 'Obrigatório' }]}>
              <Input placeholder='Matemática' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="cargaHoraria" label="Carga horaria" rules={[{ required: true, message: 'Obrigatório' }]}>
              <Input placeholder='68' />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Space size='small'>
            <Button shape='round' size='large' type="primary" htmlType="submit">
              Cadastrar
          </Button>
            <Button shape='round' size='large' htmlType="button" onClick={onReset}>
              Resetar
        </Button>
            <Button shape='round' size='large' type="link" htmlType="button" onClick={onFill}>
              Preencher
        </Button>
          </Space>
        </Form.Item>
      </Form>
    </FormCard>
  );
};

export default CriarDisciplinas;