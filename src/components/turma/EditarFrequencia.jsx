import React from 'react'
import FormCard from '../FormCard'
import {
  Form,
  Button,
  Col,
  Row,
  Space,
  message,
  InputNumber,
} from 'antd';

const EditarFrequencia = ({ title }) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    message.success(`Frequência alterada com sucesso!`)
  };

  return (
    <FormCard title={title}>
      <Form
        layout='vertical'
        form={form}
        name="atualizar-frequencia"
        onFinish={onFinish}>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item name="frequencia" label="Faltas">
              <InputNumber
                size='large'
                min='0'
                type='number'
                placeholder='Ex: 2'
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Space size='small'>
            <Button shape='round' size='large' type="primary" htmlType="submit">
              Enviar
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </FormCard>
  );
};
export default EditarFrequencia
