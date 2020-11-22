import {
  Form,
  Button,
  Col,
  Row,
  Space,
  Modal
} from 'antd';
import FormCard from '../FormCard';
import Input from '../Input'

export default ({ title, initialValues }) => {
  const [form] = Form.useForm();

  const onFinish = values => {
    Modal.success({
      content: `${title} da ${values['serie']} ${values['turma']} criado com sucesso!`,
    });
  };

  const onReset = () => {
    form.resetFields();
  };


  return (
    <FormCard title={title}>
      <Form layout='vertical' form={form} name="nome-disciplina" onFinish={onFinish} initialValues={initialValues}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="serie" label="Serie" rules={[{ required: true, message: 'Obrigatório' }]}>
              <Input placeholder='8' />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name="turma" label="Turma" rules={[{ required: true, message: 'Obrigatório' }]}>
              <Input placeholder='A' />
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
          </Space>
        </Form.Item>
      </Form>
    </FormCard>
  );
};
