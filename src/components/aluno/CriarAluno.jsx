import React, { useState, useEffect } from 'react'
import { mockAluno } from "../../models/aluno"
import Input from "../Input"
import FormCard from '../FormCard'
import Aluno from '../../services/aluno'

import {
    Form,
    Button,
    Select,
    Col,
    Row,
    Space,
    Modal,
    Radio,
} from 'antd';
import useSerieTurma from '../../hooks/useSerieTurma';

const CriarAluno = ({ tipo = "Aluno" }) => {
    const [form] = Form.useForm();
    const aluno = new Aluno();
    const [value, setValue] = React.useState(1);

    const { Option } = Select;
    const {series, turmas} = useSerieTurma()

    const onChange = e => {
        setValue(e.target.value);
    };

    const onFinish = async values => {
        const response = await aluno.buscaCPF(values.cpf)

        if (response.data.length == 0) {
            aluno.criar(values)
            Modal.success({title: "Aluno Cadastrado com Sucesso."})
        } else {
            aluno.atualizar(values)
            Modal.success({title: "Aluno Atualizado com Sucesso."})
        }
    };

    const onReset = () => {
        form.resetFields();
    };

    const onFill = () => {
        form.setFieldsValue(mockAluno);
    };

    return (
        <Form
            layout="vertical"
            form={form}
            name="criar-aluno"
            onFinish={onFinish}
        >
            <FormCard
            tip='Preencha os dados corretamente para criar um aluno para o sistema'
            title={'Cadastro de Aluno'}>
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item
                            label="Nome Completo"
                            name="nome"
                            rules={[{ required: true, message: 'Nome é um campo obrigatório' }]}
                        >
                            <Input placeholder="Ex: João da Silva" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="CPF"
                            name="cpf"
                            rules={[{ required: true, message: 'CPF é um campo obrigatório' }]}
                        >
                            <Input placeholder="Ex: 333.666.999-11" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="RG"
                            name="rg"
                            rules={[{ required: true, message: 'RG é um campo obrigatório' }]}
                        >
                            <Input placeholder="Ex: 12.345.678-9" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: false }]}
                        >
                            <Input placeholder="Ex: aluno@email.com" />
                        </Form.Item>

                        <Form.Item
                            label="Sexo"
                            name="sexo"
                            rules={[{ required: true, message: 'Indique o sexo do aluno' }]}
                        >
                            <Radio.Group onChange={onChange} value={value}>
                                <Radio value={1}>Masculino</Radio>
                                <Radio value={2}>Feminino</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Row gutter={8}>
                            <Space>
                                <Form.Item
                                    label="Série"
                                    name="serie"
                                    rules={[{ required: true, message: 'Indique a Série' }]}
                                >
                                    <Select placeholder="Série" style={{ width: 120 }}>
                                        {series.map(serie => (
                                            <Option value={serie.id}>{serie.serie}ª Série</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Turma"
                                    name="turma"
                                    rules={[{ required: true, message: 'Indique a Turma' }]}
                                >
                                    <Select placeholder="Turma" style={{ width: 120 }}>
                                        {turmas.map(turma => (
                                            <Option value={turma.turma}>Turma {turma.turma}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Ano"
                                    name="anoTurma"
                                    rules={[{ required: true, message: 'Indique o Ano' }]}
                                >
                                    <Select placeholder="Ano" style={{ width: 120 }}>
                                        {turmas.map(turma => (
                                            <Option value={turma.ano}>
                                            {turma.ano}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Space>
                        </Row>
                    </Col>
                </Row>
            </FormCard>

            <FormCard title={'Informações do Responsável Legal'}>
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item
                            label="Nome do Responsável"
                            name="nomeResponsavel"
                            rules={[{ required: true, message: 'Informe o nome do responsável pelo aluno' }]}
                        >
                            <Input placeholder="Ex: Paulo da Silva" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="CPF do Responsável"
                            name="cpfResponsavel"
                            rules={[{ required: true, message: 'CPF é um campo obrigatório' }]}
                        >
                            <Input placeholder="Ex: 333.666.999-11" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Telefone do Responsável"
                            name="telefoneResponsavel"
                            rules={[{ required: true, message: 'O número do Telefone é um campo obrigatório' }]}
                        >
                            <Input placeholder="Ex: (44) 9 8765-4321" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Email do Responsável"
                            name="emailResponsavel"
                            rules={[{ required: false }]}
                        >
                            <Input placeholder="Ex: responsavel@email.com" />
                        </Form.Item>
                    </Col>
                </Row>
            </FormCard>

            <FormCard title={'Informações sobre a Residência'}>
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item
                            label="CEP"
                            name="cep"
                            rules={[{ required: true, message: 'CEP é um campo obrigatório' }]}
                        >
                            <Input placeholder="Ex: 123456789" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Bairro"
                            name="bairro"
                            rules={[{ required: true, message: 'Bairro é um campo obrigatório' }]}
                        >
                            <Input placeholder="Ex: Jardim Felicidade" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Endereço"
                            name="endereco"
                            rules={[{ required: true, message: 'Endereço é um campo obrigatório' }]}
                        >
                            <Input placeholder="Ex: Rua Primeiro de Janeiro" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Complemento"
                            name="complemento"
                            rules={[{ required: false }]}
                        >
                            <Input placeholder="Ex: Ponto de referência ou detalhe importante" />
                        </Form.Item>
                    </Col>
                </Row>
                <Space>
                    <Button shape='round' size='large' type="primary" htmlType="submit">
                        Cadastrar
                    </Button>

                    <Button shape='round' size='large' htmlType="button" onClick={onReset}>
                        Resetar
                    </Button>

                    <Button shape='round' size='large' type="link" htmlType="button" onClick={onFill}>
                        Preencher Formulário
                    </Button>
                </Space>
            </FormCard>
        </Form>
    );
};

export default CriarAluno;