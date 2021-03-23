import React from 'react'
import { Table, Typography } from 'antd';
import ListActions from '../crudBasics/ListActions'
import { formatUsuarioOuCoordenador } from '../../models/usuarioOuCoordenador'
import CriarFuncionarioOuCoordenador from './CriarFuncionarioOuCoordenador';

const columns = [
  {
    title: 'Nome',
    dataIndex: 'primeiroNome',
    key: 'primeiroNome',
    sorter: (a, b) => a.primeiroNome.localeCompare(b.primeiroNome),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Sobrenome',
    dataIndex: 'ultimoNome',
    key: 'ultimoNome',
    sorter: (a, b) => a.ultimoNome.localeCompare(b.ultimoNome),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Gênero',
    dataIndex: 'genero',
    key: 'genero',
    sorter: (a, b) => a.genero.localeCompare(b.genero),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'E-mail',
    dataIndex: 'email',
    key: 'email',
    sorter: (a, b) => a.email.localeCompare(b.email),
    sortDirections: ['descend', 'ascend'],
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
      return (
        <ListActions
          componentForm={
            ({ setOptionsEdit }) =>
              <CriarFuncionarioOuCoordenador
                setOptionsEdit={setOptionsEdit}
                initialValues={record}
                title='Edição de Dados'
              />}
          record={record}
          enableDeleteFor={['FUNCIONARIO']}
          enableEditFor={['FUNCIONARIO']}
          formatterView={formatUsuarioOuCoordenador}
        />
      )
    },
  },
];

const ListarFuncionarioOuCoordenador = ({ tipo = 'Usuários', list }) => {

  return (
    <Table
      title={() => <Typography.Title level={3}>Listagem dos {tipo}</Typography.Title>}
      columns={columns}
      dataSource={list}
      scroll={{ x: 1300 }}
    />
  )
}
export default ListarFuncionarioOuCoordenador
