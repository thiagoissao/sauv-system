import React, { useState } from 'react'
import FormCard from '../FormCard'
import {
    Form,
    Button,
    Col,
    Row,
    Input,
    message,
    Modal,
    Popconfirm,
} from 'antd';
import { mockAlunoList } from './../../models/aluno'


const TrancarAluno = ({ title }) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [aluno, setAluno] = useState({});

    const onFinish = values => {
        console.log(values.idAluno);

        var aluno = mockAlunoList.filter(alun => alun.cpfAluno === values.idAluno);

        console.log(aluno);

        if (aluno.length === 0) {
            return message.error('Aluno não encontrado!');
        }

        setAluno(aluno[0]);
        setOpen(true);
    }

    const onConfirm = values => {
        setAluno(false);
        setOpen(false);
        return message.success('Matricula trancada!');
    }

    return (
        <>
            <FormCard title={title}>
                <Form form={form} name="trancamento-aluno" onFinish={onFinish}>
                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item name="idAluno" label="RA/CPF" rules={[{ required: true, message: 'Obrigatório' }]}>
                                <Input placeholder='0781234345' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <Button shape='round' size='large' type="primary" htmlType="submit">
                                Trancar
                            </Button>
                        </Col>
                    </Row>
                </Form>

            </FormCard >

            <Modal
                title='Detalhes do aluno'
                visible={open}
                onCancel={() => setOpen(false)}
                footer={null}
            >

                {
                    Object.entries(aluno).map(([key, value]) => (
                        <Row gutter={24} key={value}>
                            <Col>
                                <p><b>{[key]}:</b></p>
                            </Col>
                            <Col>
                                <p>{value}</p>
                            </Col>
                        </Row>
                    ))
                }
                <Popconfirm
                    title="Deseja realmente trancar?"
                    onConfirm={onConfirm}
                    okText="Sim"
                    cancelText="Não"
                >

                    <Button shape='round' size='large' type="primary" htmlType="submit">
                        Confirmar
                    </Button>
                </Popconfirm>
            </Modal>
        </>
    );
};


export default TrancarAluno;