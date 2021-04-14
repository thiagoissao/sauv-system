import Input from '../Input'
import React, { useState, useEffect } from 'react'
import FormCard from '../FormCard'
import Disciplina from '../../services/disciplinas'
import api from '../../services/api'
import profs from '../../mock/professors'
import { formatDisciplinasToList } from '../../utils/formatters';

import {
  Form,
  Button,
  Col,
  Row,
  Space,
  Modal,
  Radio
} from 'antd';

const CriarDisciplinas = ({ title, initialValues, id }) => {
  const [form] = Form.useForm();
  const disciplina = new Disciplina();
  const [value, setValue] = useState(initialValues ? initialValues.professor : null);
  const [professores, setProfessores] = useState(false);

  const getProfessores = async () => {
    const response = await api.getProfessores()
    if (response.ok) {
      console.log(response.data)
      const data = response.data.map(professor => ({ ...professor, disciplinas: formatDisciplinasToList(professor.disciplinas) }))
      setProfessores(data);
    }
  }

  useEffect(() => {
  }, [])

  useEffect(() => {
    getProfessores()
  }, [])

  const onFinish = values => {
    const professor = professores.filter(professor => professor.nome === values.professor)[0];
    if (professor.disciplinas.includes(values.nomeDisciplina)) {
      if (id) values.id = id
      disciplina.save(values)
        .then(response => {
          if (id) {
            Modal.success({
              title: `Atualização da disciplina ${values['nomeDisciplina']} realizada com sucesso!`,
              content: `Professor(a) é ${value}!`,
            });
          } else {
            Modal.success({
              title: `Cadastro da disciplina ${values['nomeDisciplina']} realizada com sucesso!`,
              content: `Professor(a) é ${value}!`,
            });
          }
        })
        .catch(error => {
          if (error && error.response && error.response.data) {
            console.log(error.response.data)
            Modal.error({
              title: `Erro ao criar a disciplina!`,
              content: `${error.response.data.message}`,
            });
          } else {
            Modal.error({
              title: `Erro ao criar a disciplina!`,
            });
          }
        })
    } else {
      Modal.error({
        title: `Erro ao cadastra a disciplina ${values['nomeDisciplina']}`,
        content: `Motivo: professor selecionado não ministra essa matéria.`
      })
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      'nomeDisciplina': "Matemática",
      'cargaHoraria': "68",
      'professor': "João Pedro"
    });
  };

  const onChange = e => {
    setValue(e.target.value);
  };

  return (
    <FormCard title={title}>
      <Form layout='vertical' form={form} name="nomeDisciplina" onFinish={onFinish} initialValues={initialValues}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="nomeDisciplina" label="Nome Disciplina" rules={[{ required: true, message: 'Obrigatório' }]}>
              <Input placeholder='Matemática' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="cargaHoraria" label="Carga horaria" rules={[{ required: true, message: 'Obrigatório' }]}>
              <Input placeholder='68' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="professor" label="Professor dessa matéria" rules={[{ required: true, message: 'Obrigatório' }]}>
              <Radio.Group onChange={onChange} value={value}>
                {
                  professores &&
                  professores.map(professor => (
                    <Col span={9}>
                      <Radio value={professor.nome}>{professor.nome}</Radio>
                    </Col>
                  ))
                }
              </Radio.Group>
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
              Preencher
        </Button>
          </Space>
        </Form.Item>
      </Form>
    </FormCard>
  );
};

export default CriarDisciplinas;