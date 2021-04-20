import React, { useState, useEffect } from 'react'
import { Table, Typography } from 'antd';
import ListActions from '../crudBasics/ListActions'
import CriarSerie from './CriarSerie'
import Serie from '../../services/series'
import { ROLE } from '../../utils/enum';

const columns = [
  {
    title: 'Série',
    dataIndex: 'serie',
    key: 'serie',
    sorter: (a, b) => a["serie"].localeCompare(b["serie"]),
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
            ({ setOptionsEdit }) =>
              <CriarSerie
                id={record.id}
                initialValues={record}
                setOptionsEdit={setOptionsEdit}
                title='Edição de Serie'
              />
          }
          record={record}
          endpoint="series"
          enableDeleteFor={[ROLE.coordenador, ROLE.funcionario]}
          enableEditFor={[ROLE.coordenador, ROLE.funcionario]}
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
        const series = response.data.map((serie) => {
          return {...serie, disciplinas:JSON.parse(serie.disciplinas)}
        })
        setSeries(series)
      })
      .catch(error => {
        console.log(error.response.data)
        setSeries(false)
      })
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
