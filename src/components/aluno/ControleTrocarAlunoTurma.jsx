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
  Modal,
  Typography
} from 'antd';
import { mockAlunoList } from '../../models/aluno';
import Turma from '../../services/turmas';
import Aluno from '../../services/aluno'


const ControleTrocarAlunoTurma = () => {
  const [formIdAluno] = Form.useForm();
  const [formSerieTurma] = Form.useForm();
  const [aluno, setAluno] = useState();
  const [turmas, setTurmas] = useState(false);
  const { Option } = Select;
  const alunoClass = new Aluno();

  const handleFinish = async ({ cpfAluno }) => {
    
    const dadosAluno = await alunoClass.buscaCPF(cpfAluno)
      .then(response => {
        console.log(response.data)
        setAluno(response.data[0]);
        return response.data[0];
      })
      .catch(error => {
        console.log(error);
        setAluno(false);
      })

    const turmaPorSerie = new Turma();
    //pegar quantidade de alunos na turma
    console.log(dadosAluno)
    const turmas = await turmaPorSerie.buscaPorSerie(dadosAluno.serie)
      .then(response => {
        console.log(response.data)
        return response.data;
      })
      .catch(error => {
        console.log(error);
        return false;
      })
    setTurmas(turmas);
  }

  const handleSubmit = async ({ turma }) => {
    if(aluno.turma != turma) {
      await alunoClass.trocaTurma({
        cpf: aluno.cpf,
        serie: aluno.serie,
        turma: turma,
        anoTurma: aluno.anoTurma
      })
        .then(response => {
          Modal.success({title: response.data.message})
          setAluno(false);
          setTurmas(false);
        })
        .catch(error => {
          console.log(error);
          if (error && error.response && error.response.data && error.response.data.message)
            Modal.error({
              title: "Erro ao trocar aluno de turma",
              content: error.response.data.message
            })
          else
            Modal.error({title:"Erro ao trocar aluno de turma"})
        })
    } else {
      Modal.error({title:"Aluno já pertence a está turma!"})
    }

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
                  <Typography.Text>Selecione a nova turma para o aluno <b>{aluno.nomeAluno}</b> da série {aluno.serie}</Typography.Text>
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
                        {turmas &&
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
