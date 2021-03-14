import React, { useState, useEffect } from 'react'
import { Table, Typography } from 'antd';
import ListActions from '../crudBasics/ListActions'
import CriarSerie from './CriarSerie'
import Serie from '../../services/series'

const formatRecord = record => {

  const formattedDisciplinas = record.map(disciplina => {
    if (disciplina === 'arte') return 'Arte'
    if (disciplina === 'biologia') return 'Biologia'
    if (disciplina === 'ciencias') return 'Ciências'
    if (disciplina === 'edFisica') return 'Educação Fisica'
    if (disciplina === 'ensReligioso') return 'Ensino Religioso'
    if (disciplina === 'fisica') return 'Física'
    if (disciplina === 'geografia') return 'Geografia'
    if (disciplina === 'história') return 'História'
    if (disciplina === 'ingles') return 'Inglês'
    if (disciplina === 'matematica') return 'Matemática'
    if (disciplina === 'portugues') return 'Português'
    if (disciplina === 'quimica') return 'Quimíca'
    return disciplina
  });


  return formattedDisciplinas;
}

const columns = [
  {
    title: 'Série',
    dataIndex: 'anoLetivo',
    key: 'anoLetivo',
    sorter: (a, b) => a["anoLetivo"].localeCompare(b["anoLetivo"]),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Disciplinas',
    dataIndex: 'disciplinas',
    key: 'disciplinas',
    render: (record) => {
      record = formatRecord(record);
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
            ({ setOptionsEdit }) =>
              <CriarSerie
                setOptionsEdit={setOptionsEdit}
                title='Edição de Serie'
              />
          }

          record={record}
          enableDeleteFor={['FUNCIONARIO', 'COORDENADOR']}
          enableEditFor={['FUNCIONARIO', 'COORDENADOR']}
          enableViewFor={[]}
        />
      )
    }
  },
];

const ListarSerie = ({ tipo = 'Séries' }) => {
  const [series, setSeries] = useState(false);
  const classSeries = new Serie();

  useEffect(() => {
    classSeries.buscaTodas()
      .then(response => {
        setSeries(response.data)
      })
      .catch(error => setSeries(false))
  }, [])

  return (
    <Table
      title={() => <Typography.Title level={3}>Listagem das {tipo}</Typography.Title>}
      columns={columns}
      dataSource={series}
      scroll={{ x: 1000 }} />
  )
}
export default ListarSerie
