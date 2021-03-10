import React, { useState, useEffect } from 'react'
import { Table, Typography } from 'antd';
import ListActions from '../crudBasics/ListActions';
import CriarDisciplina from './CriarDisciplina'
import Disciplina from '../../services/disciplinas';

const columns = [
  {
    title: 'Nome Disciplina',
    dataIndex: 'nomeDisciplina',
    key: 'nomeDisciplina',
    sorter: (a, b) => a["nomeDisciplina"].localeCompare(b["nomeDisciplina"]),
    sortDirections: ['descend', 'ascend']
  },
  {
    title: 'Carga horária',
    dataIndex: 'cargaHoraria',
    key: 'cargaHorario',
  },
  {
    title: 'Nome professor',
    dataIndex: 'professor',
    key: 'professor',
    sorter: (a, b) => a["professor"].localeCompare(b["professor"]),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Ações',
    key: 'operation',
    render: (record) => <ListActions
      componentForm={
        <CriarDisciplina
          initialValues={record}
          title='Edição de Dados'
        />}
      record={record}
      enableEditFor={['COORDENADOR', 'FUNCIONARIO']}
      enableDeleteFor={['COORDENADOR', 'FUNCIONARIO']}
    />
  },
];

const ListarDisciplinas = ({ tipo = 'Disciplinas' }) => {
  const [disciplinas, setDisciplinas] = useState(false);
  const classDisciplina = new Disciplina();
  
  useEffect(() => {
    classDisciplina.buscaTodas()
      .then(response => {
        setDisciplinas(response.data)
      })
      .catch(err => setDisciplinas(false));
  }, []);


  return (
    <Table
      title={() => <Typography.Title level={3}>Listagem das {tipo}</Typography.Title>}
      columns={columns}
      dataSource={disciplinas}
      scroll={{ x: 1300 }} />
  )
}
export default ListarDisciplinas
