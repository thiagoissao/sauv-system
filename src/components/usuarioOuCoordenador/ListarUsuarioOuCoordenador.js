import React from 'react'
import { Table, Typography, Button, Space } from 'antd';
import { EyeOutlined, EditOutlined } from '@ant-design/icons'
import { mockUsuarioCoordenadorList } from '../../models/usuarioOuCoordenador'

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
    render: () => (
      <Space>
        <Button shape='circle' type="primary" icon={<EditOutlined />} />
        <Button shape='circle' type="primary" icon={<EyeOutlined />} />
      </Space>
    ),
  },
];

const ListarUsuarioOuCoordenador = ({ tipo = 'Usuários' }) => {
  return (
    <Table
      title={() => <Typography.Title level={2}>Listagem dos {tipo}</Typography.Title>}
      columns={columns}
      dataSource={mockUsuarioCoordenadorList}
      scroll={{ x: 1300 }} />
  )
}
export default ListarUsuarioOuCoordenador
