import React, { useState, useEffect } from 'react'
import { Table, Typography } from 'antd';
import ListActions from '../crudBasics/ListActions'
import CriarTurma from './CriarTurma'
import Turma from '../../services/turmas'

const columns = [
  {
    title: 'Nome Turma',
    dataIndex: 'nome',
    key: 'nome',
  },
  {
    title: 'Série',
    dataIndex: 'serie',
    key: 'serie',
    sorter: (a, b) => a.serie.localeCompare(b.serie),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Turma',
    dataIndex: 'turma',
    key: 'turma',
    sorter: (a, b) => a.turma.localeCompare(b.turma),
    sortDirections: ['descend', 'ascend'],
  },
  // {
  //   title: 'Disciplinas',
  //   dataIndex: 'disciplinas',
  //   key: 'disciplinas',
  //   render: (record) => {
  //     return record.join(', ')
  //   }
  // },
  // {
  //   title: 'Professores',
  //   dataIndex: 'professores',
  //   key: 'professores',
  //   render: (record) => {
  //     return record.join(', ')
  //   }
  // },
  // {
  //   title: 'Alunos',
  //   dataIndex: 'alunos',
  //   key: 'alunos',
  //   render: (record) => {
  //     return record.join(', ')
  //   }
  // },
  {
    title: 'Ações',
    key: 'operation',
    render: (record) => {

      return (
        <ListActions
          componentForm={
            ({ setOptionsEdit }) =>
              <CriarTurma
                id={record.id}
                setOptionsEdit={setOptionsEdit}
                initialValues={record}
                title='Edição de Dados'
              />}
          record={record}
          endpoint="turmas"
          enableDeleteFor={['funcionario', 'coordenador']}
          enableEditFor={['funcionario', 'coordenador']}
          enableViewFor={[]}
        />
      )
    }
  },
];

const ListarTurmas = ({ tipo = 'Turmas' }) => {
  const [turmas, setTurmas] = useState(false);
  const classTurma = new Turma();

  useEffect(() => {
    classTurma.buscaTodas()
      .then(response => {
        setTurmas(response.data);
      })
      .catch(error => {
        if(error && error.response && error.response.data)
          console.log(error.response.data)
        setTurmas(false);
      })
  }, [])

  return (
    <Table
      title={() => <Typography.Title level={3}>Listagem das {tipo}</Typography.Title>}
      columns={columns}
      dataSource={turmas}
      scroll={{ x: 1300 }} />
  )
}
export default ListarTurmas
