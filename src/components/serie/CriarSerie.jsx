import Input from '../Input'
import React from 'react'
import FormCard from '../FormCard'
import {
  Form,
  Button,
  Col,
  Row,
  Space,
  Modal,
  Checkbox
} from 'antd';
import Serie from '../../services/series'

export default ({ title, initialValues }) => {
  const [form] = Form.useForm();
  const serie = new Serie();
  const [value, setValue] = React.useState(1);

  const onFinish = values => {
    serie.criar(values)
      .then(response => {
        Modal.success({
          title: `Cadastro da série ${values.anoLetivo} realiazada com sucesso!`,
          content: `Disciplinas desta série: ${values.disciplinas}!`,
        });
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
    <FormCard title={title}>
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
                  <Col span={9}>
                    <Checkbox value="arte">Arte</Checkbox>
                  </Col>
                  <Col span={9}>
                    <Checkbox value="biologia">Biologia</Checkbox>
                  </Col>
                  <Col span={9}>
                    <Checkbox value="ciencias">Ciências</Checkbox>
                  </Col>
                  <Col span={9}>
                    <Checkbox value="edFisica">Ed.Fisica</Checkbox>
                  </Col>
                  <Col span={9}>
                    <Checkbox value="ensReligioso">Ens.Religioso</Checkbox>
                  </Col>
                  <Col span={9}>
                    <Checkbox value="fisica">Física</Checkbox>
                  </Col>
                  <Col span={9}>
                    <Checkbox value="geografia">Geografia</Checkbox>
                  </Col>
                  <Col span={9}>
                    <Checkbox value="historia">História</Checkbox>
                  </Col>
                  <Col span={9}>
                    <Checkbox value="ingles">Inglês</Checkbox>
                  </Col>
                  <Col span={9}>
                    <Checkbox value="matematica">Matemática</Checkbox>
                  </Col>
                  <Col span={9}>
                    <Checkbox value="portugues">Português</Checkbox>
                  </Col>
                  <Col span={9}>
                    <Checkbox value="quimica">Química</Checkbox>
                  </Col>
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
