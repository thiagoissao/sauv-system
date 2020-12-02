import React from 'react'
import { Table, Typography } from 'antd';
import { mockTurmas } from '../../models/turmas'
import ListActions from '../crudBasics/ListActions'
import CriarTurma from './CriarTurma'
import { formatTurmas } from '../../models/turmas'


const columns = [
  {
    title: 'Nome Turma',
    dataIndex: 'nome-turma',
    key: 'nome-turma',
  },
  {
    title: 'Série',
    dataIndex: 'serie',
    key: 'serie',
    sorter: (a, b) => a.serie.localeCompare(b.serie),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Turma',
    dataIndex: 'turma',
    key: 'turma',
    sorter: (a, b) => a.turma.localeCompare(b.turma),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Disciplinas',
    dataIndex: 'disciplinas',
    key: 'disciplinas',
    render: (record) => {
      return record.join(', ')
    }
  },
  {
    title: 'Professores',
    dataIndex: 'professores',
    key: 'professores',
    render: (record) => {
      return record.join(', ')
    }
  },
  {
    title: 'Alunos',
    dataIndex: 'alunos',
    key: 'alunos',
    render: (record) => {
      return record.join(', ')
    }
  },
  {
    title: 'Ações',
    key: 'operation',
    render: (record) => {

      return (
        <ListActions
          componentForm={
            <CriarTurma
              initialValues={record}
              title='Edição de Dados'
            />}
          record={record}
          enableDeleteFor={['FUNCIONARIO', 'COORDENADOR']}
          enableEditFor={['FUNCIONARIO', 'COORDENADOR']}
          enableViewFor={[]}
          formatterView={formatTurmas}
        />
      )
    }
  },
];

const ListarTurmas = ({ tipo = 'Turmas' }) => {
  return (
    <Table
      title={() => <Typography.Title level={3}>Listagem das {tipo}</Typography.Title>}
      columns={columns}
      dataSource={mockTurmas}
      scroll={{ x: 1300 }} />
  )
}
export default ListarTurmas
