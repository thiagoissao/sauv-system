import React, { useState } from "react"
import { mockRelatorioDisciplina } from "../../models/relatorio"
import { mockRelatorioAluno } from "../../models/relatorio"
import FormCard from '../FormCard'
import { Form, Select, Button, Row, Space, Table } from "antd"

const GerarRelatorio = ({ title }) => {
    const { Option } = Select;
    const [form] = Form.useForm();

    const [values, setValues] = useState({});

    const onFinish = values => {
        setValues(values)
    };

    const onReset = () => {
        form.resetFields();
    };

    const columnsDisciplina = [
        {
            title: "Nome Disciplina",
            dataIndex: "nome-disciplina",
            key: "nome-disciplina",
        },
        {
            title: "Nome Professor",
            dataIndex: "nome-professor",
            key: "nome-professor",
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
        }
    ];

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
                                name="serie"
                                rules={[{ required: true, message: 'Indique a Série' }]}
                            >
                                <Select placeholder="Série" style={{ width: 120 }}>
                                    <Option value="1">1ª Série</Option>
                                    <Option value="2">2ª Série</Option>
                                    <Option value="3">3ª Série</Option>
                                    <Option value="4">4ª Série</Option>
                                    <Option value="5">5ª Série</Option>
                                    <Option value="6">6ª Série</Option>
                                    <Option value="7">7ª Série</Option>
                                    <Option value="8">8ª Série</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Turma"
                                name="turma"
                                rules={[{ required: true, message: 'Indique a Turma' }]}
                            >
                                <Select placeholder="Turma" style={{ width: 120 }}>
                                    <Option value="a">Turma A</Option>
                                    <Option value="b">Turma B</Option>
                                    <Option value="c">Turma C</Option>
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
                values.serie && values.turma && values.ano && (
                    <div style={{ marginTop: 16 }}>
                        <FormCard title="Relatório">
                            <Table
                                columns={columnsDisciplina}
                                dataSource={mockRelatorioDisciplina}
                                scroll={{ x: 1300 }}
                            />
                            <Table
                                columns={columnsAluno}
                                dataSource={mockRelatorioAluno}
                                scroll={{ x: 1300 }}
                            />
                        </FormCard>
                    </div>
                )
            }
        </>
    );
};

export default GerarRelatorio;