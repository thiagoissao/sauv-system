import React, { useState } from 'react'
import FormCard from '../FormCard'
import {
  Form,
  Button,
  Select,
  Row,
  Col,
  Table,
  Typography
} from 'antd';
import * as R from 'ramda'
import { alunosFisica, alunosMatematica } from '../../models/notas';
import ListActions from '../crudBasics/ListActions';
import EditarNotasForm from './EditarNotasForm';
import { ROLE } from '../../utils/enum';
import useSerieTurma from '../../hooks/useSerieTurma';
import api from '../../services/api';


const columns = [
  {
    title: 'Nome',
    dataIndex: 'nome',
    key: 'nome',
    sorter: (a, b) => a.nome.localeCompare(b.nome),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Disciplina',
    dataIndex: 'disciplina',
    key: 'disciplina',
  },
  {
    title: 'Nota 1',
    dataIndex: 'nota1b',
    key: 'nota1b',
    sorter: (a, b) => a.nota1b - b.nota1b,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Nota 2',
    dataIndex: 'nota2b',
    key: 'nota2b',
    sorter: (a, b) => a.nota2b - b.nota2b,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Nota 3',
    dataIndex: 'nota3b',
    key: 'nota3b',
    sorter: (a, b) => a.nota3b - b.nota3b,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Nota 4',
    dataIndex: 'nota4b',
    key: 'nota4b',
    sorter: (a, b) => a.nota4b - b.nota4b,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Editar Notas',
    key: 'operation',
    render: (record) => {
      return (
        <ListActions
          componentForm={
            ({ setOptionsEdit }) =>
              <EditarNotasForm
                setOptionsEdit={setOptionsEdit}
                initialValues={record}
                title={`Editar Nota - ${record.nome}`}
              />}
          formWidth={600}
          record={record}
          disableDelete
          disableView
          enableEditFor={[ROLE.professor]}
        />
      )
    },
  },
];


const ControleNotas = () => {
  const [formTurma] = Form.useForm();
  const [formDisciplina] = Form.useForm();
  const [disciplinas, setDisciplinas] = useState(null)
  const [notas, setNotas] = useState(null)

  const {turmas, series} = useSerieTurma()

  const { Option } = Select;

  const handleSearchDisciplinas = async ({turmaId, serieId}) => {
    const response = await api.getDisciplinasWithTurmaSerie({turmaId, serieId})
    if(response.ok){
      setDisciplinas(response.data)
    }
  }

  const handleSearchNotas = async ({disciplinaId}) => {
    const turmaId = formTurma.getFieldValue('turmaId')
    const serieId = formTurma.getFieldValue('serieId')
    const ano = formTurma.getFieldValue('ano')
    const response = await api.getNotas({turmaId, serieId, disciplinaId, ano})
    if(response.ok) {
      setNotas(response.data)
    }
  }

  return (
    <>
      <FormCard 
        tip='As notas dos alunos para cada disciplina é atualizada nesta seção, para isso, preencha as informações requeridas e faça as mudanças necessárias'
        title='Controle de Notas - Selecionar Turma'>
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
                    <Option key={serie.id} value={serie.id}>{serie.serie}ª Série</Option>
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
                    <Option key={turma.turma} value={turma.turma}>Turma {turma.turma}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                label="Ano"
                name="ano"
                rules={[{ required: true, message: 'Obrigatório' }]}
              >
                <Select placeholder="Ano">
                  {turmas.map(turma => (
                    <Option key={turma.ano} value={turma.ano}>{turma.ano}</Option>
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
        !R.isNil(disciplinas) && (
          <div style={{ marginTop: 16 }}>
            <FormCard title='Controle de Notas - Selecionar Disciplina'>
              <Form
                layout='vertical'
                form={formDisciplina}
                name="criar-usuario"
                onFinish={handleSearchNotas}>
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
        notas && (
          <div style={{ marginTop: 16 }}>
            <Table
              title={() => <Typography.Title level={3}>Notas da Turma</Typography.Title>}
              columns={columns}
              // dataSource={alunosFisica}
              dataSource={notas}
              scroll={{ x: 1300 }}
            />
          </div>
        )
      }
    </>
  )
}

export default ControleNotas
