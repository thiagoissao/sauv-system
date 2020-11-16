import React from 'react'
import { Table, Typography } from 'antd';
import { mockDisciplinas } from '../../models/disciplinas'
import ListActions from '../ListActions';

const columns = [
  {
    title: 'Nome Disciplina',
    dataIndex: 'nome-disciplina',
    key: 'nome-disciplina',
  },
  {
    title: 'Carga horária',
    dataIndex: 'carga-horaria',
    key: 'carga-horario',
  },
  {
    title: 'Nome professor',
    dataIndex: 'nome-professor',
    key: 'nome-professor'
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
      dataSource={mockDisciplinas}
      scroll={{ x: 1300 }} />
  )
}
export default ListarTurmas
