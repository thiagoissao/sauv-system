import React, { useState } from 'react'
import FormCard from '../FormCard'
import {
  Form,
  Button,
  Select,
  Row,
  Col,
  Table,
  Modal,
  Typography
} from 'antd';
import { alunos8A, alunos8B, disciplinas, series, turmas } from '../../models/frequencia';
import ListActions from '../crudBasics/ListActions';
import EditarFrequencia from './EditarFrequencia';



const columns = [
  {
    title: 'Alunos',
    dataIndex: 'nome',
    key: 'nome'
  },
  {
    title: 'Editar Frequencia',
    key: 'operation',
    render: (record) => {
      return (
        <ListActions
          componentForm={
            <EditarFrequencia 
              title="Editar Frequência"
              values={record}
            />
          }
          formWidth={600}
          record={record}
          disableDelete
          disableView
          enableEditFor={['PROFESSOR']}
        />
      )
    },
  },
];


const ControleFrequencia = () => {
  const [formTurma] = Form.useForm();
  const [formDisciplina] = Form.useForm();
  const [values, setValues] = useState({})
  const [idDisciplina, setIdDisciplina] = useState(0)

  const dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
  const meses = [1,2,3,4,5,6,7,8,9,10,11,12]
  const ano = [2020]

  
  const { Option } = Select;

  return (
    <>
      <FormCard title='Controle de Frequência - Selecionar Turma'>
        <Form
          layout='vertical'
          form={formTurma}
          name="selecionar-turma"
          onFinish={setValues}>
          <Row gutter={24} align='bottom'>
            <Col span={4}>
              <Form.Item
                label="Série"
                name="serie"
                rules={[{ required: true, message: 'Indique a Série' }]}
              >
                <Select placeholder="Série">
                  {
                    series.map(serie => (
                      <Option value={serie.value}>{serie.label}</Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                label="Turma"
                name="turma"
                rules={[{ required: true, message: 'Indique a Turma' }]}
              >
                <Select placeholder="Turma">
                  {
                    turmas.map(turma => (
                      <Option value={turma.value}>{turma.label}</Option>
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
      {
        values.serie && values.turma && (
          <div style={{ marginTop: 16 }}>
            <FormCard title='Controle de Frequência - Selecionar Disciplina'>
              <Form
                layout='vertical'
                form={formDisciplina}
                name="selecionar-disciplina"
                onFinish={({ disciplina }) => setIdDisciplina(disciplina)}>
                <Row gutter={24} align='bottom'>
                  <Col span={4}>
                    <Form.Item
                      label="Disciplina"
                      name="disciplina"
                      rules={[{ required: true, message: 'Obrigatório' }]}
                    >
                      <Select placeholder="Disciplina">
                        {
                          disciplinas.map(d => (
                            <Option value={d.idDisciplina}>{d.nome}</Option>
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
      {
        idDisciplina !== 0 && (
        <div style={{ marginTop: 16 }}>
          <FormCard title="Controle de Frequência - Selecionar dia">
            <Form
            layout='vertical'
            form={formTurma}
            name="selecionar-turma"
            onFinish={setValues}>
              <Row gutter={24} align='bottom'>
                <Col span={4}>
                  <Form.Item
                    label="Dia"
                    name="dia"
                    rules={[{ required: true, message: 'Indique o dia' }]}
                  >
                    <Select placeholder="Dia">
                      {
                        dias.map(dia => (
                          <Option value={dia}>{dia}</Option>
                        ))
                      }
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    label="Mês"
                    name="mes"
                    rules={[{ required: true, message: 'Indique o mês' }]}
                  >
                    <Select placeholder="Mês">
                      {
                        meses.map(mes => (
                          <Option value={mes}>{mes}</Option>
                        ))
                      }
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    label="Ano"
                    name="ano"
                    rules={[{ required: true, message: 'Indique o ano' }]}
                  >
                    <Select placeholder="Ano">
                      {
                        ano.map(ano => (
                          <Option value={ano}>{ano}</Option>
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
      {
        values.dia && values.mes && values.ano && (
        <div style={{ marginTop: 16 }}>
          <Form
            layout='vertical'
            form={formDisciplina}
            name="criar-usuario"
            >
              <FormCard title="Frequência dos alunos">
                  <Table 
                    columns={columns}
                    dataSource={values.turma == 'a' ? alunos8A : alunos8B}>        
                  </Table>
          
              </FormCard>
          </Form>
        </div>
        )
      }
    </>
  )
}

export default ControleFrequencia
