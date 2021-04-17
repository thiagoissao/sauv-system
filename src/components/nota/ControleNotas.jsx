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
import { alunosFisica, alunosMatematica, anos, disciplinas, series, turmas } from '../../models/notas';
import ListActions from '../crudBasics/ListActions';
import EditarNotasForm from './EditarNotasForm';
import { ROLE } from '../../utils/enum';

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
  const [values, setValues] = useState({})
  const [idDisciplina, setIdDisciplina] = useState(0)

  const { Option } = Select;

  return (
    <>
      <FormCard 
        tip='As notas dos alunos para cada disciplina é atualizada nesta seção, para isso, preencha as informações requeridas e faça as mudanças necessárias'
        title='Controle de Notas - Selecionar Turma'>
        <Form
          layout='vertical'
          form={formTurma}
          name="selecionar-turma"
          onFinish={setValues}>
          <Row gutter={24} align='bottom'>
            <Col span={4}>
              <Form.Item
                label="Ano"
                name="ano"
                rules={[{ required: true, message: 'Obrigatório' }]}
              >
                <Select placeholder="Ano">
                  {
                    anos.map(ano => (
                      <Option value={ano.value}>{ano.label}</Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
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
        values.ano && values.serie && values.turma && (
          <div style={{ marginTop: 16 }}>
            <FormCard title='Controle de Notas - Selecionar Disciplina'>
              <Form
                layout='vertical'
                form={formDisciplina}
                name="criar-usuario"
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
            <Table
              title={() => <Typography.Title level={3}>Notas da Turma</Typography.Title>}
              columns={columns}
              dataSource={idDisciplina === 1 ? alunosMatematica : alunosFisica}
              scroll={{ x: 1300 }}
            />
          </div>
        )
      }
    </>
  )
}

export default ControleNotas
