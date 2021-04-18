import React, { useState, useEffect } from 'react'
import { Table, Typography } from 'antd';
import ListActions from '../crudBasics/ListActions'
import CriarAluno from "./CriarAluno"
import { formatAluno } from '../../models/aluno'
import { ROLE } from '../../utils/enum';
import Aluno from '../../services/aluno';

const columns = [
  {
    title: 'Nome do Aluno',
    dataIndex: 'nome',
    key: 'nome',
    sorter: (a, b) => a.nomeAluno.localeCompare(b.nomeAluno),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'CPF do Aluno',
    dataIndex: 'cpf',
    key: 'cpf',
  },
  {
    title: 'Nome do Responsável',
    dataIndex: 'nomeResponsavel',
    key: 'nomeResponsavel',
    sorter: (a, b) => a.nomeResponsavel.localeCompare(b.nomeResponsavel),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'CPF do Responsável',
    dataIndex: 'cpfResponsavel',
    key: 'cpfResponsavel'
  },
  {
    title: 'Ações',
    key: 'operation',
    render: (record) => <ListActions
      componentForm={
        ({ setOptionsEdit }) => <CriarAluno
          setOptionsEdit={setOptionsEdit}
          initialValues={record}
          title='Edição de Dados'
        />}
      record={record}
      endpoint="aluno"
      enableEditFor={[ROLE.coordenador, ROLE.funcionario]}
      enableDeleteFor={[ROLE.coordenador, ROLE.funcionario]}
      formatterView={formatAluno}
    />
  },
];

const ListarAluno = ({ tipo = 'Alunos' }) => {
  const [alunos, setAlunos] = useState(false);
  const classAluno = new Aluno();

  useEffect(() => {
    classAluno.buscarTodos()
    .then(response => {
      setAlunos(response.data)
    })
    .catch(err => setAlunos(false));
  }, []);

  return (
    <Table
      title={() => <Typography.Title level={3}>Listagem dos {tipo}</Typography.Title>}
      columns={columns}
      dataSource={alunos}
      scroll={{ x: 1300 }}
    />
  )
}
export default ListarAluno
