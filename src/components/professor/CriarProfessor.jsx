import React, { useState, useEffect } from 'react'
import Input from '../Input'
import FormCard from '../FormCard'
import {
    Form,
    Button,
    Select,
    Col,
    Row,
    Space,
    Modal,
} from 'antd';
import api from '../../services/api'
import { Usuario } from '../../services/usuario';
import { ROLE } from '../../utils/enum';

const CriarProfessor = ({ initialValues, setOpenEdit }) => {
    const isNew = !initialValues?.id
    const [form] = Form.useForm();
		const [disciplinas, setDisciplinas] = useState([])

    const { Option } = Select;

    const cadastrarProfessor = async values => {
        const response = await api.postProfessor(values);
        const user = new Usuario()
        await user.criar({
            username: values.username,
            senha: values.password,
            tipo: ROLE.professor
        })
        if (response.ok) {
            Modal.success({
                content: `Cadastro atualizado com sucesso!`,
            });
            return
        }
        Modal.error({
            content: `Erro ao salvar, tente novamente.`,
        });
    }

    const atualizarProfessor = async values => {
        const response = await api.updateProfessor(values, initialValues.id)
        if (response.ok) {
            Modal.success({
                content: `Professor atualizado com sucesso!`,
            });
            setOpenEdit(false)
            return
        }
        Modal.error({
            content: `Erro ao salvar, tente novamente.`,
        });
    }

    const onFinish = values => {
        if (isNew) {
            cadastrarProfessor(values)
            return
        }
        atualizarProfessor(values)
    };

		const findDisciplinas = async () => {
			const response = await api.getDisciplinas()
			if(response.ok){
				setDisciplinas(response.data)
			}
		}

		useEffect(() => {
			findDisciplinas()
		}, [])

    return (
        <Form
            initialValues={initialValues}
            layout='vertical'
            form={form}
            name="criar-professor"
            onFinish={onFinish}
        >
            <FormCard 
                tip='Formulário de criação para professor, após o cadastro, este registro será possível realizar login no sistema'
                title={isNew ? 'Cadastro de Professor' : `Edição de Professor`}>
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item
                            label="Nome Completo"
                            name="nome"
                            rules={[{ required: true, message: 'Nome é um campo obrigatório' }]}
                        >
                            <Input placeholder="Ex: Lucas Aurélio" />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            label="CPF"
                            name="cpf"
                            rules={[{ required: true, message: 'CPF é um campo obrigatório' }]}
                        >
                            <Input placeholder="Ex: 123.456.789-11" />
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
                            rules={[{ required: true, message: "Email é um campo obrigatório" }]}
                        >
                            <Input placeholder="Ex: professor@email.com" />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            label="Telefone"
                            name="telefone"
                            rules={[{ required: true, message: 'O número do Telefone é um campo obrigatório' }]}
                        >
                            <Input placeholder="Ex: (44) 9 9876-5432" />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            label="Formação"
                            name="formacao"
                            rules={[{ required: true, message: 'formação um campo obrigatório' }]}
                        >
                            <Input placeholder="Ex: Ciência da Computação" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item
                            label="Disciplinas"
                            name="disciplinas">
                            <Select
                                    mode="multiple"
                                    allowClear
                                    placeholder="Selecione as Disciplinas">
                                    {disciplinas.map(({nomeDisciplina, id}) => (
                                        <Option key={id}>{nomeDisciplina}</Option>
                                    ))}
                            </Select>
                    </Form.Item>
                    </Col>
                    {isNew && (
                        <>
                        <Col span={8}>
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Username é um campo obrigatório' }]}
                            >
                                <Input  />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Senha"
                                name="password"
                                rules={[{ required: true, message: 'Senha é um campo obrigatório' }]}
                            >
                                <Input type='password' />
                            </Form.Item>
                        </Col>
                        </>
                    ) }
                </Row>

                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item
                            label="CEP"
                            name="cep"
                            rules={[{ required: true, message: 'CEP é um campo obrigatório' }]}
                        >
                            <Input placeholder="Ex: 12.345.678" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Bairro"
                            name="bairro"
                            rules={[{ required: true, message: 'Bairro é um campo obrigatório' }]}
                        >
                            <Input placeholder="Ex: trinta e um de dezembro" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Endereço"
                            name="endereco"
                            rules={[{ required: true, message: 'Endereço é um campo obrigatório' }]}
                        >
                            <Input placeholder="Ex: Rua nove de maio" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Complemento"
                            name="complemento"
                            rules={[{ required: true, message: 'Complemento é um campo obrigatório' }]}
                        >
                            <Input placeholder="Ex: Ponto de referência ou detalhe importante" />
                        </Form.Item>
                    </Col>
                </Row>

                <Space>
                    <Button shape='round' size='large' type="primary" htmlType="submit">
                        Cadastrar
                    </Button>
                </Space>
            </FormCard>
        </Form>
    );
};

export default CriarProfessor;
