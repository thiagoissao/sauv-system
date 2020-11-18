import React from 'react'
import { Table, Typography } from 'antd';
import ListActions from '../crudBasics/ListActions'
import { formatUsuarioOuCoordenador } from '../../models/usuarioOuCoordenador'

const columns = [
  {
    title: 'Nome',
    dataIndex: 'primeiroNome',
    key: 'primeiroNome',
  },
  {
    title: 'Sobrenome',
    dataIndex: 'ultimoNome',
    key: 'ultimoNome',
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

      return (
        <ListActions
          record={record}
          formatterView={formatUsuarioOuCoordenador}
          onClickEdit={handleClickEdit}
        />
      )
    },
  },
];

const ListarUsuarioOuCoordenador = ({ tipo = 'Usuários', list }) => {

  return (
    <Table
      title={() => <Typography.Title level={3}>Listagem dos {tipo}</Typography.Title>}
      columns={columns}
      dataSource={list}
      scroll={{ x: 1300 }}
    />
  )
}
export default ListarUsuarioOuCoordenador
