import React from 'react'
import { Table, Typography } from 'antd';
import ListActions from '../ListActions'

const columns = [
  {
    title: 'Nome',
    dataIndex: 'primeiro-nome',
    key: 'primeiro-nome',
  },
  {
    title: 'Sobrenome',
    dataIndex: 'ultimo-nome',
    key: 'ultimo-nome',
  },
  {
    title: 'Gênero',
    dataIndex: 'genero',
    key: 'genero'
  },
  {
    title: 'E-mail',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Celular',
    dataIndex: 'celular',
    key: 'celular'
  },
  {
    title: 'CPF',
    dataIndex: 'cpf',
    key: 'cpf'
  },
  {
    title: 'Cidade',
    dataIndex: 'cidade',
    key: 'cidade'
  },

  {
    title: 'Ações',
    key: 'operation',
    render: (record) => {
      const handleClickEdit = () => {
        console.log(record)

      }

      const handleClickView = () => {
        console.log(record)

      }

      return (
        <ListActions
          onClickEdit={handleClickEdit}
          onClickView={handleClickView}
        />
      )
    },
  },
];

const ListarUsuarioOuCoordenador = ({ tipo = 'Usuários', list }) => {

  return (
    <Table
      title={() => <Typography.Title level={2}>Listagem dos {tipo}</Typography.Title>}
      columns={columns}
      dataSource={list}
      scroll={{ x: 1300 }}
    />
  )
}
export default ListarUsuarioOuCoordenador
