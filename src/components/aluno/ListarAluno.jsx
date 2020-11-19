import React from 'react'
import { Table, Typography } from 'antd';
import ListActions from '../crudBasics/ListActions'
import { formatAluno } from '../../models/aluno'

const columns = [
  {
    title: 'Nome do Aluno',
    dataIndex: 'nomeAluno',
    key: 'nomeAluno',
  },
  {
    title: 'CPF do Aluno',
    dataIndex: 'cpfAluno',
    key: 'cpfAluno',
  },
  {
    title: 'Nome do Responsável',
    dataIndex: 'nomeResponsavel',
    key: 'nomeResponsavel'
  },
  {
    title: 'CPF do Responsável',
    dataIndex: 'cpfResponsavel',
    key: 'cpfResponsavel'
  },
  {
    title: 'Ações',
    key: 'operation',
    render: (record) => {


      const handleClickEdit = () => {
        console.log(record)

      }

      return (
        <ListActions
          record={record}
          formatterView={formatAluno}
          onClickEdit={handleClickEdit}
        />
      )
    },
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
