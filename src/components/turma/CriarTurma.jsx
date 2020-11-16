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

export default ({ tipo = 'Turma' }) => {
  const [form] = Form.useForm();

  const onFinish = values => {
    Modal.success({
      content: `${tipo} da série ${values['serie-turma']} criado com sucesso!`,
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      'serie-turma': '8',
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
            <Form.Item name="serie-turma" label="Serie turma" rules={[{ required: true, message: 'Obrigatório' }]}>
              <Input placeholder='8' />
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