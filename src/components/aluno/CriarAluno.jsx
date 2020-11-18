import React from 'react'
import './CriarAluno.css'
import { Form, Input, Radio, Typography, Modal, Button } from 'antd';
const { Title } = Typography;

const CriarAluno = () => {

    const [value, setValue] = React.useState(1);

    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const onFinish = values => {
        Modal.success({
            content: "Criado com sucesso!",
        });
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Form
                layout="vertical"
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <div className="InfoAluno">
                    <Title>Dados sobre o Aluno</Title>

                    <Form.Item
                        label="Nome Completo"
                        name="Nome"
                        rules={[{ required: true, message: 'Nome é um campo obrigatório' }]}
                    >
                        <Input placeholder="Ex: João da Silva" />
                    </Form.Item>

                    <Form.Item
                        label="CPF"
                        name="CPF"
                        rules={[{ required: true, message: 'CPF é um campo obrigatório' }]}
                    >
                        <Input placeholder="Ex: 11133366699" />
                    </Form.Item>

                    <Form.Item
                        label="RG"
                        name="RG"
                        rules={[{ required: true, message: 'RG é um campo obrigatório' }]}
                    >
                        <Input placeholder="Ex: 123456789" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="Email"
                        rules={[{ required: false }]}
                    >
                        <Input placeholder="Ex: joao@email.com" />
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

                </div>

                <div className="infoResponsavel">
                    <Title>Dados sobre o responsável</Title>

                    <Form.Item
                        label="Nome do Responsável"
                        name="NomeResponsavel"
                        rules={[{ required: true, message: 'Informe o nome do responsável pelo aluno' }]}
                    >
                        <Input placeholder="Ex: João da Silva" />
                    </Form.Item>

                    <Form.Item
                        label="CPF"
                        name="CPF"
                        rules={[{ required: true, message: 'CPF é um campo obrigatório' }]}
                    >
                        <Input placeholder="Ex: 11133366699" />
                    </Form.Item>
                </div>

                <div className="infoResidencia">
                    <Title>Dados sobre a residência</Title>

                    <Form.Item
                        label="Endereço"
                        name="Endereço"
                        rules={[{ required: true, message: 'Endereço é um campo obrigatório' }]}
                    >
                        <Input placeholder="Ex: Rua Primeiro de Janeiro" />
                    </Form.Item>
                </div>
                <Button shape='round' size='large' type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default CriarAluno;