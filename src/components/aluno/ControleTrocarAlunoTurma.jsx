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
import Turma from '../../services/turmas';


const ControleTrocarAlunoTurma = () => {
  const [formIdAluno] = Form.useForm();
  const [formSerieTurma] = Form.useForm();
  const [aluno, setAluno] = useState();
  const [turmas, setTurmas] = useState(false);
  const { Option } = Select;

  const handleFinish = async ({ cpfAluno }) => {
    const alunoFind = mockAlunoList.find(aluno => aluno.cpfAluno === cpfAluno)
    //buscar aluno
    if (!alunoFind) {
      return message.error('CPF não encontrado!')
    }
    setAluno(alunoFind);
    const turmaPorSerie = new Turma();
    //pegar quantidade de alunos na turma
    const turmaSemQtdd = await turmaPorSerie.buscaPorSerie(alunoFind.serie_turma)
      .then(response => response.data)
      .catch(error => {
        console.log(error);
        return false;
      })
    if(turmaSemQtdd) {
      const todosAlunosDeUmaSerie = (aluno) => aluno["serie_turma"] === alunoFind["serie_turma"];
      const turmasComQtdd = turmaSemQtdd.map(turma => {
        const todosAlunosDeUmaTurma = (aluno) => aluno.turma.toUpperCase() === turma.turma.toUpperCase();
        return {
          ...turma,
          qtddAlunos: mockAlunoList.filter(todosAlunosDeUmaSerie).filter(todosAlunosDeUmaTurma).length
        }
      })
      setTurmas(turmasComQtdd);
    } else {
      setTurmas(false);
    }
    
  }

  const handleSubmit = ({ turma }) => {
    //chamar update do aluno.
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
                        { turmas &&
                          turmas.map((turma, index) => (
                            <Option disabled={turma.qtddAlunos >= 2} value={turma.turma}>{turma.turma}</Option>
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
