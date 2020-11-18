import React from 'react'
import { Table, Typography } from 'antd';
import { mockSerie } from '../../models/series'
import ListActions from '../crudBasics/ListActions'

const columns = [
  {
    title: 'Série',
    dataIndex: 'serie-ano',
    key: 'serie-ano',
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
    title: 'Ações',
    key: 'operation',
    render: () => <ListActions
                disableView/>
  },
];

const ListarSerie = ({ tipo = 'Serie' }) => {
  return (
    <Table
      title={() => <Typography.Title level={3}>Listagem das {tipo}</Typography.Title>}
      columns={columns}
      dataSource={mockSerie}
      scroll={{ x: 1000 }} />
  )
}
export default ListarSerie
