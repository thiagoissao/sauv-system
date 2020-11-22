import React from 'react'
import { Table, Typography } from 'antd';
import ListActions from '../crudBasics/ListActions'
import { formatProfessor } from '../../models/professor'

const columns = [
  {
    title: 'Nome',
    dataIndex: 'nome',
    key: 'nome',
  },
  {
    title: 'CPF',
    dataIndex: 'cpf',
    key: 'cpf',
  },
  {
    title: 'RG',
    dataIndex: 'rg',
    key: 'rg'
  },
  {
    title: 'Disciplinas',
    dataIndex: 'disciplinas',
    key: 'disciplinas'
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
          formatterView={formatProfessor}
          onClickEdit={handleClickEdit}
        />
      )
    },
  },
];

const ListarProfessor = ({ tipo = 'Professores', list }) => {

  return (
    <Table
      title={() => <Typography.Title level={3}>Listagem dos {tipo}</Typography.Title>}
      columns={columns}
      dataSource={list}
      scroll={{ x: 1300 }}
    />
  )
}
export default ListarProfessor;