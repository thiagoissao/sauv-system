import React from 'react'
import { Table, Typography } from 'antd';
import ListActions from '../crudBasics/ListActions'
import CriarAluno from "./CriarAluno"
import { formatAluno } from '../../models/aluno'

const columns = [
  {
    title: 'Nome do Aluno',
    dataIndex: 'nomeAluno',
    key: 'nomeAluno',
    sorter: (a, b) => a.nomeAluno.localeCompare(b.nomeAluno),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'CPF do Aluno',
    dataIndex: 'cpfAluno',
    key: 'cpfAluno',
  },
  {
    title: 'Nome do Responsável',
    dataIndex: 'nomeResponsavel',
    key: 'nomeResponsavel',
    sorter: (a, b) => a.nomeResponsavel.localeCompare(b.nomeResponsavel),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'CPF do Responsável',
    dataIndex: 'cpfResponsavel',
    key: 'cpfResponsavel'
  },
  {
    title: 'Ações',
    key: 'operation',
    render: (record) => <ListActions
      componentForm={
        ({ setOptionsEdit }) => <CriarAluno
          setOptionsEdit={setOptionsEdit}
          initialValues={record}
          title='Edição de Dados'
        />}
      record={record}
      enableEditFor={['coordenador', 'funcionario']}
      enableDeleteFor={['coordenador', 'funcionario']}
      formatterView={formatAluno}
    />
  },
];

const ListarAluno = ({ tipo = 'Alunos', list }) => {

  return (
    <Table
      title={() => <Typography.Title level={3}>Listagem dos {tipo}</Typography.Title>}
      columns={columns}
      dataSource={list}
      scroll={{ x: 1300 }}
    />
  )
}
export default ListarAluno
