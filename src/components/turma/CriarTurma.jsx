import {
  Form,
  Button,
  Col,
  Row,
  Space,
  Modal
} from 'antd';
import FormCard from '../FormCard';
import Input from '../Input';
import Turma from '../../services/turmas';

export default ({ title, initialValues }) => {
  const [form] = Form.useForm();
  const classTurma = new Turma();
  const onFinish = values => {
    classTurma.criar(values)
      .then(response => {
        console.log(response);
        Modal.success({
          title: `Turma criada com sucesso!`,
          content: `${values['serie']} ${values['turma']}!`,
        });
      })
      .catch(err => {
        console.log(err);
        Modal.error({
          title: `Erro ao criar a turma!`,
          content: `Verifique se a mesma já não existe no sistema!`,
        });
      })
    
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
              Cadastrar
            </Button>
            <Button shape='round' size='large' htmlType="button" onClick={onReset}>
              Resetar
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </FormCard>
  );
};
