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
import api from '../../services/api';

const EditarNotasForm = ({
  title,
  initialValues, 
  cpfAluno, 
  turmaId, 
  disciplinaId
}) => {
  const isNew = !initialValues

  const [form] = Form.useForm();

  const onFinish = async values => {
    if(!isNew) {
      const response = await api.patchNota({...initialValues, ...values})
      if(response.ok) {
        message.success(`Nota alterada com sucesso!`)
        return
      }
      message.error(`Erro`)
      return
    }  

    const response = await api.postNota({...values, cpfAluno, turmaId, disciplinaId})
    if(response.ok) {
      message.success(`Nota alterada com sucesso!`)
      return
    }
    message.error(`Erro ao criar nota`)
  };

  return (
    <FormCard title={title}>
      <Form
        initialValues={initialValues}
        layout='vertical'
        form={form}
        name="criar-usuario"
        onFinish={onFinish}>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item name="nota1b" label="Nota 1">
              <InputNumber
                step={0.01}
                size='large'
                type='number'
                min={0}
                max={10}
                placeholder='Ex: 9.8'
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="nota2b" label="Nota 2">
              <InputNumber
                step={0.01}
                size='large'
                type='number'
                min={0}
                max={10}
                placeholder='Ex: 9.8'
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="nota3b" label="Nota 3">
              <InputNumber
                step={0.01}
                size='large'
                type='number'
                min={0}
                max={10}
                placeholder='Ex: 9.8'
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="nota4b" label="Nota 4">
              <InputNumber
                step={0.01}
                size='large'
                type='number'
                min={0}
                max={10}
                placeholder='Ex: 9.8'
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
export default EditarNotasForm
