import { Card, Col, Row, Button, Popconfirm, message } from 'antd';
import FormCard from '../FormCard'
import { LockOutlined } from '@ant-design/icons'

const TrancarTurma = ({ title}) => {

    return (
        <FormCard title={title}>

            <div className="site-card-wrapper">
                <Row gutter={16}>
                    <Col span={8}>
                        <Card title="1ª Série A" bordered={true}>
                            <div>
                                <Row gutter={16} justify="space-between">
                                    <Col>
                                        Quantidade de Alunos: 25
                                    </Col>
                                    <Col>
                                        <Button disabled type="primary" icon={<LockOutlined />}></Button>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="1ª Série B" bordered={true}>
                            <div>
                                <Row gutter={16} justify="space-between">
                                    <Col>
                                        Quantidade de Alunos: 18
                                    </Col>
                                    <Col>
                                        <Button disabled type="primary" icon={<LockOutlined />}></Button>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="1ª Série C" bordered={true}>
                            <div>
                                <Row gutter={16} justify="space-between">
                                    <Col>
                                        Quantidade de Alunos: 4
                                    </Col>
                                    <Col>
                                        <Popconfirm
                                            title="Deseja realmente trancar esta turma?"
                                            onConfirm={() => message.success('Turma trancada com sucesso!')}
                                            okText="Sim"
                                            cancelText="Não"
                                        >
                                            <Button type="primary" icon={<LockOutlined />}></Button>
                                        </Popconfirm>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
            <br></br>
            <div className="site-card-wrapper">
                <Row gutter={16}>
                    <Col span={8}>
                        <Card title="2ª Série A" bordered={true}>
                            <div>
                                <Row gutter={16} justify="space-between">
                                    <Col>
                                        Quantidade de Alunos: 24
                                    </Col>
                                    <Col>
                                        <Button disabled type="primary" icon={<LockOutlined />}></Button>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="2ª Série B" bordered={true}>
                            <div>
                                <Row gutter={16} justify="space-between">
                                    <Col>
                                        Quantidade de Alunos: 27
                                    </Col>
                                    <Col>
                                        <Button disabled type="primary" icon={<LockOutlined />}></Button>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
            <br></br>
            <div className="site-card-wrapper">
                <Row gutter={16}>
                    <Col span={8}>
                        <Card title="3ª Série A" bordered={true}>
                            <div>
                                <Row gutter={16} justify="space-between">
                                    <Col>
                                        Quantidade de Alunos: 28
                                    </Col>
                                    <Col>
                                        <Button disabled type="primary" icon={<LockOutlined />}></Button>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="3ª Série B" bordered={true}>
                            <div>
                                <Row gutter={16} justify="space-between">
                                    <Col>
                                        Quantidade de Alunos: 23
                                    </Col>
                                    <Col>
                                        <Button disabled type="primary" icon={<LockOutlined />}></Button>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="3ª Série C" bordered={true}>
                            <div>
                                <Row gutter={16} justify="space-between">
                                    <Col>
                                        Quantidade de Alunos: 7
                                    </Col>
                                    <Col>
                                        <Popconfirm
                                            title="Deseja realmente trancar esta turma?"
                                            onConfirm={() => message.success('Turma trancada com sucesso!')}
                                            okText="Sim"
                                            cancelText="Não"
                                        >
                                            <Button type="primary" icon={<LockOutlined />}></Button>
                                        </Popconfirm>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </FormCard>
    );
};

export default TrancarTurma;