import React from 'react'
import { Table, Typography } from 'antd';
import ListActions from '../crudBasics/ListActions'
import CriarProfessor from './CriarProfessor';
import { formatProfessor } from '../../models/professor'

const columns = [
    {
        title: 'Nome',
        dataIndex: 'nome',
        key: 'nome',
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
        key: 'disciplinas'
    },
    {
        title: 'Ações',
        key: 'operation',
        render: (record) => <ListActions
            componentForm={
                <CriarProfessor
                    initialValues={record}
                    title='Edição de Dados'
                />}
            record={record}
            enableEditFor={['COORDENADOR', 'FUNCIONARIO']}
            enableDeleteFor={['COORDENADOR', 'FUNCIONARIO']}
            formatterView={formatProfessor}
        />
    },
];

const ListarProfessor = ({ tipo = 'Professores', list }) => {
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