import Input from '../Input'
import React, { useState, useEffect } from 'react'
import FormCard from '../FormCard'
import {
  Form,
  Button,
  Col,
  Row,
  message,
  Space,
  Modal,
  Checkbox
} from 'antd';
import Serie from '../../services/series'
import Disciplina from '../../services/disciplinas'

export default ({ title, initialValues, id }) => {
  const [form] = Form.useForm();
  const serie = new Serie();
  const [value, setValue] = useState(1);
  const [disciplinas, setDisciplinas] = useState(false);

  useEffect(() => {
    const disciplina = new Disciplina();
    disciplina.buscaTodas()
      .then(response => setDisciplinas(response.data))
      .catch(error => {
        console.log(error);
        setDisciplinas(false);
      })
  }, [])

  const onFinish = values => {
    if(id) values.id = id;
    serie.save(values)
      .then(response => {
        if(id) {
          Modal.success({
            title: `Atualização da série ${values.anoLetivo} realiazada com sucesso!`,
            content: `Disciplinas desta série: ${values.disciplinas}!`,
          });
        } else {
          Modal.success({
            title: `Cadastro da série ${values.anoLetivo} realiazada com sucesso!`,
            content: `Disciplinas desta série: ${values.disciplinas}!`,
          });
        }
      })
      .catch(error => {
        if(error && error.response && error.response.data){
          console.log(error.response.data)
          Modal.error({
            title: `Erro ao criar a turma!`,
            content: `${error.response.data.message}`,
          });
        } else {
          Modal.error({
            title: `Erro ao criar a turma!`,
          });
        }
      })
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      'serie-ano': '8',
      'disciplinas': ['arte', 'ensReligioso', 'biologia',
        'ciencias', 'ingles', 'matematica', 'portugues'],
    });
  };

  return (
    <FormCard 
      tip='Faça o cadastro de uma série preenchendo o formulário abaixo, após isso clique em cadastrar para confirmar os dados'
      title={title}>
      <Form layout='vertical' form={form} name="serie-ano" onFinish={onFinish} initialValues={initialValues}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="anoLetivo" label="Série" rules={[{ required: true, message: 'Obrigatório' }]}>
              <Input placeholder='8' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="disciplinas" label="Disciplinas desta série" rules={[{ required: true, message: 'Obrigatório' }]}>
              <Checkbox.Group value={value} style={{ width: '100%' }} >
                <Row gutter={[16, 8]}>
                  {
                    disciplinas && disciplinas.map(disciplina => (
                      <Col span={16}>
                        <Checkbox value={disciplina.nomeDisciplina}>{disciplina.nomeDisciplina}</Checkbox>
                      </Col>    
                    ))
                  }

                </Row>
              </Checkbox.Group>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Space size='small'>
            <Button shape='round' size='large' type="primary" htmlType="submit">
              Cadastrar
            </Button>
            <Button shape='round' size='large' htmlType="button" onClick={onReset}>
              Resetar
          </Button>
            <Button shape='round' size='large' type="link" htmlType="button" onClick={onFill}>
              Preencher Cadastro
          </Button>
          </Space>
        </Form.Item>
      </Form>
    </FormCard>
  );
};
