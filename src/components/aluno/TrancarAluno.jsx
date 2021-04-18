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
import api from '../../services/api';


const TrancarAluno = ({ title }) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [aluno, setAluno] = useState({});

    const onFinish = async ({cpf}) => {

        const response = await api.getAlunos()
        if(!response.ok){
            return message.error('Erro na requisição, tente novamente');
        } 

        const alunos = response.data
        const alunosFiltered = alunos.filter(pessoa => pessoa.cpf === cpf);

        if(alunosFiltered.length > 0){
            setAluno(alunosFiltered[0]);
            setOpen(true);    
            return
        }

        return message.error('Aluno não encontrado!');
    }

    const onConfirm = async () => {
        const response = await api.trancarAluno(aluno.cpf)
        if(response.ok){
            setAluno(false);
            setOpen(false);
            return message.success('Matricula trancada!');
        }
        return message.error('Erro!')
    }

    return (
        <>
            <FormCard 
                tip='Para trancar o aluno da instituição, é necessário preencher o seu CPF'
                title={title}>
                <Form form={form} name="trancamento-aluno" onFinish={onFinish}>
                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item name="cpf" label="CPF" rules={[{ required: true, message: 'Obrigatório' }]}>
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
                    Object.entries(aluno).map(([key, value], index) => (
                        <Row gutter={24} key={index}>
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