import React, { useState, useEffect } from "react"
import FormCard from '../FormCard'
import { Form, Select, Button, Row, Space, Table } from "antd"
import api from '../../services/api'
import {relatorioTurma} from '../../models/relatorio'

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

    const [turmas, setTurmas] = useState([])
    const [series, setSeries] = useState([])
    const [relatorio, setRelatorio] = useState(null)

    const onFinish = ({serieId, turmaId, ano}) => {
      const response = api.getRelatorioTurma({serieId, turmaId, ano})
      setRelatorio(relatorioTurma)
      if(response.ok){
        setRelatorio(response.data)        
      }
    };

    const onReset = () => form.resetFields();

    const getInitialData = async () => {
      const responseSeries = await api.getSeries()
      const responseTurmas = await api.getTurmas()

      if(responseSeries.ok && responseTurmas.ok){
        setTurmas(responseTurmas.data)
        setSeries(responseSeries.data)
      }
    }

    useEffect(() => {
      getInitialData()
    }, [])

    return (
      <>
          <Form
              form={form}
              name="GerarRelatorio"
              onFinish={onFinish}
          >
              <FormCard title={title}>
                  <Row gutter={8}>
                    <Space>
                      <Form.Item
                          label="Série"
                          name="serieId"
                          rules={[{ required: true, message: 'Indique a Série' }]}
                      >
                        <Select placeholder="Série" style={{ width: 120 }}>
                            {series.map(serie => (
                              <Option value={serie.id}>{serie.anoLetivo}ª Série</Option>
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
                            <Option value={turma.id}>Turma {turma.turma}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                          label="Ano"
                          name="ano"
                          rules={[{ required: true, message: 'Indique o Ano' }]}
                      >
                        <Select placeholder="Ano" style={{ width: 120 }}>
                          <Option value="2015">2015</Option>
                          <Option value="2016">2016</Option>
                          <Option value="2017">2017</Option>
                          <Option value="2018">2018</Option>
                          <Option value="2019">2019</Option>
                          <Option value="2020">2020</Option>
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
                    dataSource={relatorioTurma.disciplinas}
                    scroll={{ x: 1300 }}
                  />
                  <Table
                    columns={columnsAluno}
                    dataSource={relatorioTurma.alunos}
                    scroll={{ x: 1300 }}
                  />
                </FormCard>
              </div>
            )
          }
      </>);
};

export default GerarRelatorio;