import React from 'react'
import { Table, Typography } from 'antd';
import { mockSerie } from '../../models/series'
import ListActions from '../crudBasics/ListActions'
import CriarSerie from './CriarSerie'
import { formatSerie } from '../../models/series'

const formatRecord = record => {

  const formattedDisciplinas = record.disciplinas.map(disciplina => { 
      if (disciplina === 'Arte') return 'arte'
      if (disciplina === 'Biologia') return 'biologia'
      if (disciplina === 'Ciencias') return 'ciencias'
      if (disciplina === 'Educação Fisica') return 'edFisica'
      if (disciplina === 'Ensino religioso') return 'ensReligioso'
      if (disciplina === 'Fisica') return 'fisica'
      if (disciplina === 'Geografia') return 'geografia'
      if (disciplina === 'História') return 'historia'
      if (disciplina === 'Inglês') return 'ingles'
      if (disciplina === 'Matemática') return 'matematica'
      if (disciplina === 'Português') return 'portugues'
      if (disciplina === 'Química') return 'quimica'
   } );


   return ({
      ...record,
      disciplinas: formattedDisciplinas
   })
}

const columns = [
  {
    title: 'Série',
    dataIndex: 'serie-ano',
    key: 'serie-ano',
    sorter: (a, b) => a["serie-ano"].localeCompare(b["serie-ano"]),
    sortDirections: ['descend', 'ascend'],
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
            initialValues={formatRecord(record)}
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
