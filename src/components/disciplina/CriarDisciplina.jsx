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

export default ({ tipo = 'Disciplina' }) => {
  const [form] = Form.useForm();

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

  return (
    <>
      <Row gutter={24}>
        <Col span={24}>
          <Divider orientation="left" plain>
            <Typography.Title level={2}>Cadastro de {tipo}</Typography.Title>
          </Divider>
        </Col>
      </Row>
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
            <Form.Item name="nome-professor" label="Nome Professor" rules={[{ required: true, message: 'Obrigatório' }]}>
              <Input placeholder='Matheus' />
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