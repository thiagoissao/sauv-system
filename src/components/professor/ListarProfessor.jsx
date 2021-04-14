import React, { useState, useEffect } from 'react'
import { Table, Typography } from 'antd';
import ListActions from '../crudBasics/ListActions'
import CriarProfessor from './CriarProfessor';
import { formatProfessor } from '../../models/professor'
import api from '../../services/api'
import { formatDisciplinasToList } from '../../utils/formatters';
import store from '../../redux/auth';
import useUser from '../../hooks/useUser';
import { ROLE } from '../../utils/enum';

const columns = [
    {
        title: 'Nome',
        dataIndex: 'nome',
        key: 'nome',
        sorter: (a, b) => a.nome.localeCompare(b.nome),
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'CPF',
        dataIndex: 'cpf',
        key: 'cpf',
    },
    {
        title: 'RG',
        dataIndex: 'rg',
        key: 'rg'
    },
    {
        title: 'Disciplinas',
        dataIndex: 'disciplinas',
        key: 'disciplinas',
    },
    {
        title: 'Ações',
        key: 'operation',
        render: (record) =>
            <ListActions
                componentForm={
                    ({ setOpenEdit }) => (
                        <CriarProfessor
                            setOpenEdit={setOpenEdit}
                            initialValues={record}
                            title='Edição de Dados'
                        />
                    )
                }
                record={record}
                enableEditFor={[ROLE.coordenador, ROLE.funcionario]}
                enableDeleteFor={[ROLE.coordenador, ROLE.funcionario]}
                endpoint='professores'
                formatterView={formatProfessor}
            />,
    },
];

const ListarProfessor = ({ tipo = 'Professores' }) => {

  const [list, setList] = useState([])

  const getProfessores = async () => {
    const response = await api.getProfessores()
    if (response.ok) {
        const data = response.data.map(professor => ({...professor, disciplinas: formatDisciplinasToList(professor.disciplinas)}))
        setList(data)
    }
  }

  useEffect(() => {
    getProfessores()
  }, [])

  return (
    <Table
      title={() => <Typography.Title level={3}>Listagem dos {tipo}</Typography.Title>}
      columns={columns}
      dataSource={list}
      scroll={{ x: 1300 }}
    />
  )
}
export default ListarProfessor;
