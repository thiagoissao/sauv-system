import React, { useState, useEffect } from "react"
import FormCard from '../FormCard'
import { Form, Select, Button, Row, Space, Table } from "antd"
import api from '../../services/api'
import useSerieTurma from "../../hooks/useSerieTurma";

const columnsDisciplina = [
  {
      title: "Nome Disciplina",
      dataIndex: "nomeDisciplina",
      key: "nomeDisciplina",
  },
  {
      title: "Nome Professor",
      dataIndex: "professor",
      key: "professor",
  },
];

const columnsAluno = [
  {
      title: "Nome do Aluno",
      dataIndex: "nomeAluno",
      key: "nomeAluno",
  },
  {
      title: "CPF do Aluno",
      dataIndex: "cpfAluno",
      key: "cpfAluno",
  },
  {
      title: "Nome do Responsável",
      dataIndex: "nomeResponsavel",
      key: "nomeResponsavel",
  },
  {
      title: "CEP",
      dataIndex: "cep",
      key: "cep",
  },
];

const GerarRelatorio = ({ title }) => {
    const { Option } = Select;
    const [form] = Form.useForm();
    const {turmas, series} = useSerieTurma()
    

    const [relatorio, setRelatorio] = useState(null)

    const onFinish = async ({serieId, turmaId, ano}) => {
      const response = await api.getRelatorioTurma({serieId, turmaId, ano})
      if(response.ok){
        setRelatorio(response.data)        
      }
    };

    const onReset = () => form.resetFields();

    return (
      <>
          <Form
              form={form}
              name="GerarRelatorio"
              onFinish={onFinish}
          >
              <FormCard
                tip='Preencha as informações abaixo para exibir os dados de disciplinas e turma'
                title={title}>
                  <Row gutter={8}>
                    <Space>
                      <Form.Item
                          label="Série"
                          name="serieId"
                          rules={[{ required: true, message: 'Indique a Série' }]}
                      >
                        <Select placeholder="Série" style={{ width: 120 }}>
                            {series.map(serie => (
                              <Option key={serie.id} value={serie.id}>{serie.serie}ª Série</Option>
                            ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                          label="Turma"
                          name="turmaId"
                          rules={[{ required: true, message: 'Indique a Turma' }]}
                      >
                        <Select placeholder="Turma" style={{ width: 120 }}>
                          {turmas.map(turma => (
                            <Option key={turma.turma} value={turma.turma}>Turma {turma.turma}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                          label="Ano"
                          name="ano"
                          rules={[{ required: true, message: 'Indique o Ano' }]}
                      >
                        <Select placeholder="Ano" style={{ width: 120 }}>
                            {turmas.map(turma => (
                              <Option key={turma.ano} value={turma.ano}>{turma.ano}</Option>
                            ))}
                        </Select>
                      </Form.Item>
                    </Space>
                  </Row>
                  <Space>
                    <Button shape='round' size='large' type="primary" htmlType="submit">
                        Buscar
                    </Button>
                    <Button onClick={onReset} shape='round' size='large' htmlType="button" >
                        Resetar
                    </Button>
                  </Space>
              </FormCard>
          </Form>
          {
            relatorio &&  (
              <div style={{ marginTop: 16 }}>
                <FormCard title="Relatório">
                  <Table
                    columns={columnsDisciplina}
                    dataSource={relatorio?.disciplinas}
                    scroll={{ x: 1300 }}
                  />
                  <Table
                    columns={columnsAluno}
                    dataSource={relatorio?.alunos}
                    scroll={{ x: 1300 }}
                  />
                </FormCard>
              </div>
            )
          }
      </>);
};

export default GerarRelatorio;