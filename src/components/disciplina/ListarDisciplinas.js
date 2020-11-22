import React from 'react'
import { Table, Typography } from 'antd';
import { mockDisciplinas } from '../../models/disciplinas'
import ListActions from '../crudBasics/ListActions';
import CriarDisciplina from './CriarDisciplina'
import {formatDisciplinas} from '../../models/disciplinas'

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
    render: (record) => <ListActions
    componentForm={
      <CriarDisciplina
        initialValues={record}
        title='Edição de Dados'
      />}
    record={record}
    enableEditFor={['COORDENADOR', 'FUNCIONARIO']}
    enableDeleteFor={['COORDENADOR', 'FUNCIONARIO']}
    formatterView={formatDisciplinas}
  />
  },
];

const ListarTurmas = ({ tipo = 'Turmas' }) => {
  return (
    <Table
      title={() => <Typography.Title level={3}>Listagem das {tipo}</Typography.Title>}
      columns={columns}
      dataSource={mockDisciplinas}
      scroll={{ x: 1300 }} />
  )
}
export default ListarTurmas
