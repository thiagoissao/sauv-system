import React from 'react'
import Input from "../Input"
import FormCard from '../FormCard'
import {
  Form,
  Button,
  Select,
  Col,
  Row,
  Space,
  Modal,
  Radio,
} from 'antd';

const ControleTurma = ({ tipo = "Controle Turma" }) => {
  const [form] = Form.useForm();

  const { Option } = Select;
  

  return (
    <FormCard title={tipo}>
      <Row gutter={8}>
        <Space>
          <Form.Item
            label="Série"
            name="serie"
            rules={[{ required: true, message: 'Indique a Série' }]}
          >
            <Select placeholder="Série" style={{ width: 120 }}>
              <Option value="1">1ª Série</Option>
              <Option value="2">2ª Série</Option>
              <Option value="3">3ª Série</Option>
              <Option value="4">4ª Série</Option>
              <Option value="5">5ª Série</Option>
              <Option value="6">6ª Série</Option>
              <Option value="7">7ª Série</Option>
              <Option value="8">8ª Série</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Turma"
            name="turma"
            rules={[{ required: true, message: 'Indique a Turma' }]}
          >
            <Select placeholder="Turma" style={{ width: 120 }}>
              <Option value="a">Turma A</Option>
              <Option value="b">Turma B</Option>
              <Option value="c">Turma C</Option>
            </Select>
          </Form.Item>
        </Space>
      </Row>
      <Space>
        <Button shape='round' size='large' type="primary" htmlType="submit">
          Buscar
        </Button>

        <Button shape='round' size='large' htmlType="button" >
          Resetar
        </Button>
      </Space>
    </FormCard>
  )
}

export default ControleTurma
