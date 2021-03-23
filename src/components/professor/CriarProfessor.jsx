import React from 'react'
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

const OPTIONS = ["Artes", "Biologia", "Ciências", "Educação Físcia", "Ensino Religioso", "Filosofia", "Física", "Geografia", "História", "Ingles", "Matemática", "Português", "Química", "Sociologia"];

const CriarProfessor = ({ initialValues, setOpenEdit }) => {
    const isNew = !initialValues?.id
    const [form] = Form.useForm();

    const { Option } = Select;

    const children = [];
    for (let i = 0; i < OPTIONS.length; i++) {
        children.push(<Option key={i}>{OPTIONS[i]}</Option>);
    }

    const cadastrarProfessor = async values => {
        const response = await api.postProfessor(values);
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

    return (
        <Form
            initialValues={initialValues}
            layout='vertical'
            form={form}
            name="criar-professor"
            onFinish={onFinish}
        >
            <FormCard title={isNew ? 'Cadastro de Professor' : `Edição de Professor`}>
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

                <Row gutter={8}>
                    <Space>
                        <Form.Item
                            label="Nível Acadêmico"
                            name="nivelAcademico"
                            rules={[{ required: true, message: 'Indique a Série' }]}
                        >
                            <Select placeholder="Nível Acadêmico" style={{ width: 240 }}>
                                <Option value="1">Mestrado</Option>
                                <Option value="2">Doutorado</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Disciplinas"
                            name="disciplinas"
                            rules={[{ required: true, message: 'Indique a Turma' }]}
                        >
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: '240%' }}
                                placeholder="Selecione as Disciplinas"
                            >
                                {children}
                            </Select>
                        </Form.Item>
                    </Space>
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
                </Space>
            </FormCard>
        </Form>
    );
};

export default CriarProfessor;
