import React, { useState } from 'react'
import FormCard from '../FormCard'
import {
  Form,
  Button,
  Select,
  Row,
  Col,
  Input,
  message,
  Typography
} from 'antd';
import { mockAlunoList } from '../../models/aluno';
import { mockTurmas } from '../../models/turmas';

const ControleTrocarAlunoTurma = () => {
  const [formIdAluno] = Form.useForm();
  const [formSerieTurma] = Form.useForm();
  const [aluno, setAluno] = useState()
  const [idDisciplina, setIdDisciplina] = useState(0)

  const { Option } = Select;

  const handleFinish = ({ cpfAluno }) => {
    const alunoFind = mockAlunoList.find(aluno => aluno.cpfAluno === cpfAluno)

    if (!alunoFind) {
      return message.error('CPF não encontrado!')
    }

    setAluno(alunoFind)
  }

  const handleSubmit = ({ turma }) => {
    if (turma === 'C') {
      return message.warning('Erro! turma lotada!')
    }
    return message.success('Troca de turma realizada com sucesso!')
  }

  return (
    <>
      <FormCard title='Alterar Aluno de Turma'>
        <Form
          initialValues={{
            cpfAluno: '123.456.789-10'
          }}
          layout='vertical'
          form={formIdAluno}
          name="trocar-aluno-turma"
          onFinish={handleFinish}>
          <Row gutter={24} align='bottom'>
            <Col span={4}>
              <Form.Item
                label="CPF do Aluno"
                name="cpfAluno"
                rules={[{ required: true, message: 'Obrigatório' }]}
              >
                <Input placeholder='123.123.123-43' />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item>
                <Button style={{ width: '100%' }} shape='round' type="primary" htmlType="submit">
                  Buscar
              </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </FormCard>
      {
        aluno && (
          <div style={{ marginTop: 16 }}>
            <FormCard title='Série - Turma'>
              <Row gutter={24} style={{ marginBottom: 16 }}>
                <Col>
                  <Typography.Text>Selecione a nova turma para o aluno <b>{aluno.nomeAluno}</b></Typography.Text>
                </Col>
              </Row>
              <Form
                form={formSerieTurma}
                name="criar-usuario"
                onFinish={handleSubmit}>
                <Row gutter={24} align='bottom'>
                  <Col span={4}>
                    <Form.Item
                      label="Turma"
                      name="turma"
                      rules={[{ required: true, message: 'Obrigatório' }]}
                    >
                      <Select placeholder="Turma">
                        {
                          mockTurmas.filter(turma => turma.serie === '8').map(({ turma }, index) => (
                            <Option disabled={index === 0} value={turma}>{turma}</Option>
                          ))
                        }
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item>
                      <Button style={{ width: '100%' }} shape='round' type="primary" htmlType="submit">
                        Buscar
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </FormCard>
          </div>
        )
      }
    </>
  )
}

export default ControleTrocarAlunoTurma
