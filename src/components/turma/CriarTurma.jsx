import React, { useState, useEffect } from 'react'
import {
  Form,
  Button,
  Col,
  Row,
  Space,
  Modal,
  Radio,
} from 'antd';
import FormCard from '../FormCard';
import Input from '../Input';
import Turma from '../../services/turmas';
import api from '../../services/api'
import { formatDisciplinasToList } from '../../utils/formatters';
import Serie from '../../services/series';
import FormItem from 'antd/lib/form/FormItem';

export default ({ title, initialValues, id }) => {
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const classTurma = new Turma();

  const [professores, setProfessores] = useState(false);
  const [disciplinas, setDisciplinas] = useState(false);


  const getProfessores = async (disciplinas) => {
    const response = await api.getProfessores()
    if (response.ok) {
      const data = response.data.map(professor => ({
        ...professor,
        disciplinas: professor.disciplinas.reduce((array, disciplina) => {
          array.push(disciplina.nomeDisciplina);
          return array;
        }, [])
      }))
      const professoresFilter = data.filter(professor => {
        return professor.disciplinas.reduce((prev, disciplina) => {
          return prev || disciplinas.includes(disciplina);
        }, false)
      })
      console.log(professoresFilter);
      setProfessores(professoresFilter);
    }
  }

  const onFinishTurma = async values => {
    if (new Date().getFullYear() > parseInt(values['ano']) || isNaN(parseInt(values['ano']))) {
      Modal.error({
        title: "Ano inválido!",
        content: `Ano ${values['ano']} inválido, por favor insira outro!`
      })
    } else {
      const serie = new Serie();
      await serie.buscaPorAnoLetivo(values.serie)
        .then(response => {
          if (response.data) {
            setDisciplinas(JSON.parse(response.data.disciplinas));
            getProfessores(JSON.parse(response.data.disciplinas));
          } else {
            Modal.error({
              title: "Série inválida!",
              content: `Série ${values['serie']} não existe!`
            })
          }
        })
        .catch(error => {
          console.log(error.response.data.message);
          Modal.error({
            title: "Erro servidor!",
            content: `Ocorreu um erro no servidor ao tentar buscar a série ${values['serie']}!`
          })
          return false;
        });
    }
  };

  const onFinishProfessores = values => {
    const novaTurma = form.getFieldsValue(['serie', 'turma', 'ano']);
    novaTurma.professores = [];
    console.log(values)
    Object.entries(values).forEach(entrie => {
      novaTurma.professores.push(entrie);
    })
    console.log(novaTurma)
    if (id) novaTurma.id = id;
    classTurma.criar(novaTurma)
      .then(response => {
        if (id) {
          Modal.success({
            title: `Turma alterada com sucesso!`,
            content: `${novaTurma['serie']} ${novaTurma['turma']} ${novaTurma['ano']}!`,
          });
        } else {
          Modal.success({
            title: `Turma criada com sucesso!`,
            content: `${novaTurma['serie']} ${novaTurma['turma']} ${novaTurma['ano']}!`,
          });
        }
      })
      .catch(error => {
        if (error.response && error.response.data) {
          const message = typeof error.response.data.message == 'object' ? '' : error.response.data.message;
          Modal.error({
            title: `Erro ao criar a turma!`,
            content: `${message}`,
          });
        } else {
          Modal.error({
            title: `Erro ao criar a turma!`,
          });
        }
      })
  }

  const onReset = () => {
    form.resetFields();
  };

  const cancel = () => {
    form.resetFields();
    setProfessores(false);
  }


  return (
    <>
      { !professores &&
        <FormCard title={title}>
          <Form layout='vertical' form={form} name="nome-turma" onFinish={onFinishTurma} initialValues={initialValues}>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item name="serie" label="Serie" rules={[{ required: true, message: 'Obrigatório' }]}>
                  <Input placeholder='8' />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item name="turma" label="Turma" rules={[{ required: true, message: 'Obrigatório' }]}>
                  <Input placeholder='A' />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item name="ano" type="number" label="Ano" rules={[{ required: true, message: 'Obrigatório' }]}>
                  <Input placeholder='2020' />
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
              </Space>
            </Form.Item>
          </Form>
        </FormCard>
      }
      { professores &&
        <FormCard title="Escolha os professores das disciplinas">
          <Form layout='vertical' form={form1} name="professores" onFinish={onFinishProfessores} initialValues={initialValues}>
            {
              disciplinas && disciplinas.map((disciplina, index) => (
                <FormItem name={disciplina}>
                  <Row gutter={24} key={index}>
                    <Col span={4}>
                      {disciplina}
                    </Col>
                    <Col span={20}>
                      <Radio.Group>
                        {
                          professores.map((professor, index) => {
                            if (professor.disciplinas.includes(disciplina)) {
                              return (
                                <Radio key={index} value={[professor.nome, professor.id]}>{professor.nome}</Radio>
                              )
                            }
                          })
                        }
                      </Radio.Group>
                    </Col>
                  </Row>
                </FormItem>
              )
              )
            }
            <Form.Item>
              <Space size='small'>
                <Button shape='round' size='large' type="primary" htmlType="submit">
                  Cadastrar
              </Button>
                <Button shape='round' size='large' htmlType="button" onClick={cancel}>
                  Cancelar
              </Button>
              </Space>
            </Form.Item>
          </Form>
        </FormCard>
      }
    </>
  );
};
