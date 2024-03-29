import React, { useState, useEffect } from 'react'
import { Table, Typography } from 'antd';
import ListActions from '../crudBasics/ListActions';
import CriarDisciplina from './CriarDisciplina'
import Disciplina from '../../services/disciplinas';
import { ROLE } from '../../utils/enum';


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
    title: 'Ações',
    key: 'operation',
    render: (record) => <ListActions
      componentForm={
        ({ setOptionsEdit }) =>
          <CriarDisciplina
            id={record.id}
            setOptionsEdit={setOptionsEdit}
            initialValues={record}
            title='Edição de Dados'
          />}
      record={record}
      endpoint="disciplinas"
      enableEditFor={[ROLE.coordenador, ROLE.funcionario]}
      enableDeleteFor={[ROLE.coordenador, ROLE.funcionario]}
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
