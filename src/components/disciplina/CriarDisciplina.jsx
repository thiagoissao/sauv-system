import Input from '../Input'
import React from 'react'
import FormCard from '../FormCard'
import {
  Form,
  Button,
  Col,
  Row,
  Space,
  Modal,
  Radio
} from 'antd';

export default ({ tipo = 'Disciplina' }) => {
  const [form] = Form.useForm();

  const [value, setValue] = React.useState(1);

  const onFinish = values => {
    Modal.success({
      content: `${tipo} ${values['nome-disciplina']} criado com sucesso!`,
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      'nome-disciplina': 'Matemática',
      'carga-horaria': '68',
      'nome-professor': 'Matheus'
    });
  };

  const onChange = e => {
    setValue(e.target.value);
  };

  return (
    <FormCard title={`Cadastro de ${tipo}`}>
      <Form layout='vertical' form={form} name="nome-disciplina" onFinish={onFinish}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="nome-disciplina" label="Nome Disciplina" rules={[{ required: true, message: 'Obrigatório' }]}>
              <Input placeholder='Matemática' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="carga-horaria" label="Carga horaria" rules={[{ required: true, message: 'Obrigatório' }]}>
              <Input placeholder='68' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="professores" label="Professor dessa matéria" rules={[{ required: true, message: 'Obrigatório' }]}>
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
    </FormCard>
  );
};
