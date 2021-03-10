import Input from '../Input'
import React from 'react'
import FormCard from '../FormCard'
import Disciplina from '../../services/disciplinas'

import {
  Form,
  Button,
  Col,
  Row,
  Space,
  Modal,
  Radio
} from 'antd';

export default ({ title, initialValues }) => {
  const [form] = Form.useForm();
  const disciplina = new Disciplina();
  const [value, setValue] = React.useState(1);

  const onFinish = values => {
    disciplina.criar(values)
      .then(response => {
        Modal.success({
          title: `Cadastro da disciplina ${values['nomeDisciplina']} realizada com sucesso!`,
          content: `Professor(a) é ${value}!`,
        });
      })
      .catch(error => {
        Modal.error({
          title: `Erro ao cadastrar a disciplina ${values['nomeDisciplina']}.`,
          content: `Verifique se a mesma já não existe!`,
        });
      })
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      'nomeDisciplina': 'Matemática',
      'cargaHoraria': '68',
      'professor': 'João Pedro'
    });
  };

  const onChange = e => {
    setValue(e.target.value);
  };

  return (
    <FormCard title={title}>
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
          <Col span={8}>
            <Form.Item name="professor" label="Professor dessa matéria" rules={[{ required: true, message: 'Obrigatório' }]}>
              <Radio.Group onChange={onChange} value={value}>
              <Col span={9}>
                <Radio value="João Pedro">João Pedro</Radio>
              </Col>
              <Col span={9}>
                <Radio value="Ana Beatriz">Ana Beatriz</Radio>
              </Col>
              <Col span={9}>
                <Radio value="Ana Carolina">Ana Carolina</Radio>
              </Col>
              <Col span={9}>
                <Radio value="Matheus Ferreira">Matheus Ferreira</Radio>
              </Col>
              </Radio.Group>
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
