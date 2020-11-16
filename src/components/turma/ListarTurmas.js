import React from 'react'
import { Table, Typography} from 'antd';
import { mockTurmas } from '../../models/turmas'
import ListActions from '../ListActions'


const columns = [
  {
    title: 'Nome Turma',
    dataIndex: 'nome-turma',
    key: 'nome-turma',
  },
  {
    title: 'Série Turma',
    dataIndex: 'serie-turma',
    key: 'serie-turma',
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
    render: () => <ListActions />
  },
];

const ListarTurmas = ({ tipo = 'Turmas' }) => {
  return (
    <Table
      title={() => <Typography.Title level={2}>Listagem das {tipo}</Typography.Title>}
      columns={columns}
      dataSource={mockTurmas}
      scroll={{ x: 1300 }} />
  )
}
export default ListarTurmas
