import React from 'react'
import { Table, Typography } from 'antd';
import { mockSerie } from '../../models/series'
import ListActions from '../crudBasics/ListActions'
import CriarSerie from './CriarSerie'
import { formatSerie } from '../../models/series'

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
    render: (record) => {
    
      return ( 
      <ListActions
        componentForm={
          <CriarSerie
            initialValues={record}
            title='Edição de Serie'
          />}

          record={record}
          enableDeleteFor={['FUNCIONARIO', 'COORDENADOR']}
          enableEditFor={['FUNCIONARIO', 'COORDENADOR']}
          enableViewFor={[]}
          formatterView={formatSerie}
      />
      )
    }
  },
];

const ListarSerie = ({ tipo = 'Séries' }) => {
  return (
    <Table
      title={() => <Typography.Title level={3}>Listagem das {tipo}</Typography.Title>}
      columns={columns}
      dataSource={mockSerie}
      scroll={{ x: 1000 }} />
  )
}
export default ListarSerie
