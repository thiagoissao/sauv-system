import React, { useState, useEffect } from 'react'
import FormCard from '../FormCard'
import {
  Form,
  Button,
  Select,
  Row,
  Col,
  Table,
  DatePicker
} from 'antd';
import * as R from 'ramda'
import { alunos8A, alunos8B, mockDisciplinas} from '../../models/frequencia';
import ListActions from '../crudBasics/ListActions';
import EditarFrequencia from './EditarFrequencia';
import api from '../../services/api'

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
            ({ setOptionsEdit }) =>
              <EditarFrequencia
                setOptionsEdit={setOptionsEdit}
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
  const [formFrequencia] = Form.useForm()
  const [values, setValues] = useState({})

  const [turmas, setTurmas] = useState([])
  const [series, setSeries] = useState([])
  const [disciplinas, setDisciplinas] = useState([])
  const [frequencias, setFrequencias] = useState([])
  const getInitialData = async () => {
    const responseSeries = await api.getSeries()
    const responseTurmas = await api.getTurmas()

    if(responseSeries.ok && responseTurmas.ok){
      setTurmas(responseTurmas.data)
      setSeries(responseSeries.data)
    }
  }

  const handleSearchDisciplinas = async form => {
    const response = await api.getDisciplinasWithTurmaSerie(form)
    setDisciplinas(mockDisciplinas)
    if(response.ok){
      setDisciplinas(response.data)
    }
  } 

  const handleSearchFrequenciaAluno = async ({disciplinaId, diaFrequencia}) => {
    console.log(new Date(diaFrequencia).toISOString())
  }

  useEffect(() => {
    getInitialData()
  }, [])

  const { Option } = Select;


  return (
    <>
      <FormCard title='Controle de Frequência - Selecionar Turma'>
        <Form
          layout='vertical'
          form={formTurma}
          name="selecionar-turma"
          onFinish={handleSearchDisciplinas}>
          <Row gutter={24} align='bottom'>
            <Col span={4}>
              <Form.Item
                label="Série"
                name="serieId"
                rules={[{ required: true, message: 'Indique a Série' }]}
              >
                <Select placeholder="Série">
                  {series.map(serie => (
                    <Option key={serie.id} value={serie.id}>{serie.anoLetivo}ª Série</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                label="Turma"
                name="turmaId"
                rules={[{ required: true, message: 'Indique a Turma' }]}
              >
                <Select placeholder="Turma">
                  {turmas.map(turma => (
                    <Option key={turma.id} value={turma.id}>Turma {turma.turma}</Option>
                  ))}
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
        !R.isEmpty(disciplinas) && !R.isNil(disciplinas) && (
          <div style={{ marginTop: 16 }}>
            <FormCard title='Controle de Frequência - Selecionar Disciplina'>
              <Form
                layout='vertical'
                form={formDisciplina}
                name="selecionar-disciplina"
                onFinish={handleSearchFrequenciaAluno}>
                <Row gutter={24} align='bottom'>
                  <Col span={4}>
                    <Form.Item
                      label="Disciplina"
                      name="disciplinaId"
                      rules={[{ required: true, message: 'Obrigatório' }]}
                    >
                      <Select placeholder="Disciplina">
                        {
                          disciplinas.map(d => (
                            <Option key={d.id} value={d.id}>{d.nomeDisciplina}</Option>
                          ))
                        }
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      label="Dia"
                      name="diaFrequencia"
                      rules={[{ required: true, message: 'Obrigatório' }]}
                    >
                      <DatePicker  />
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
        !R.isEmpty(frequencias) && !R.isNil(frequencias) &&  (
          <div style={{ marginTop: 16 }}>
            <Form
              layout='vertical'
              form={formFrequencia}
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
