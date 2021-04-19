import React, { useState, useEffect } from "react";
import { Table, Typography } from "antd";
import ListActions from "../crudBasics/ListActions";
import { formatCoordenador } from "../../models/coordenador";
import CriarCoordenador from "./CriarCoordenador";
import { ROLE } from "../../utils/enum";
import Coordenador from "../../services/coordenador";

const columns = [
  {
    title: "Nome",
    dataIndex: "primNome",
    key: "primNome",
    sorter: (a, b) => a.primNome.localeCompare(b.primNome),
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Sobrenome",
    dataIndex: "sobrenome",
    key: "sobrenome",
    sorter: (a, b) => a.sobrenome.localeCompare(b.sobrenome),
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Gênero",
    dataIndex: "genero",
    key: "genero",
    sorter: (a, b) => a.genero.localeCompare(b.genero),
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "E-mail",
    dataIndex: "email",
    key: "email",
    sorter: (a, b) => a.email.localeCompare(b.email),
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Celular",
    dataIndex: "telefone",
    key: "telefone",
  },
  {
    title: "CPF",
    dataIndex: "cpf",
    key: "cpf",
  },
  {
    title: "Cidade",
    dataIndex: "cidade",
    key: "cidade",
  },
  {
    title: "Ações",
    key: "operation",
    render: (record) => {
      return (
        <ListActions
          componentForm={({ setOptionsEdit }) => (
            <CriarCoordenador
              setOptionsEdit={setOptionsEdit}
              initialValues={record}
              title="Edição de Dados"
            />
          )}
          record={record}
          endpoint="coordenador"
          enableDeleteFor={[ROLE.funcionario]}
          enableEditFor={[ROLE.funcionario]}
          formatterView={formatCoordenador}
        />
      );
    },
  },
];

const ListarCoordenador = ({ tipo = "Usuários", list }) => {
  const [coordenadores, setCoordenadores] = useState(false);
  const classCoordenador = new Coordenador();

  useEffect(() => {
    classCoordenador
      .buscarTodos()
      .then((response) => {
        setCoordenadores(response.data);
      })
      .catch((err) => setCoordenadores(false));
  }, []);

  return (
    <Table
      title={() => (
        <Typography.Title level={3}>Listagem dos {tipo}</Typography.Title>
      )}
      columns={columns}
      dataSource={coordenadores}
      scroll={{ x: 1300 }}
    />
  );
};
export default ListarCoordenador;
