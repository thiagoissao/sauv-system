import React from 'react'
import { Table, Typography } from 'antd';
import { mockTurmas } from '../../models/turmas'
import ListActions from '../crudBasics/ListActions'
import { formatTurmas } from '../../models/turmas'


const columns = [
  {
    title: 'Nome Turma',
    dataIndex: 'nome-turma',
    key: 'nome-turma',
  },
  {
    title: 'Série Turma',
    dataIndex: 'serie-turma',
    key: 'serie-turma',
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
    title: 'Professores',
    dataIndex: 'professores',
    key: 'professores',
    render: (record) => {
      return record.join(', ')
    }
  },
  {
    title: 'Alunos',
    dataIndex: 'alunos',
    key: 'alunos',
    render: (record) => {
      return record.join(', ')
    }
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
          formatterView={formatTurmas}
          onClickEdit={handleClickEdit}
        />
      )
    }
  },
];

const ListarTurmas = ({ tipo = 'Turmas' }) => {
  return (
    <Table
      title={() => <Typography.Title level={2}>Listagem das {tipo}</Typography.Title>}
      columns={columns}
      dataSource={mockTurmas}
      scroll={{ x: 1300 }} />
  )
}
export default ListarTurmas
