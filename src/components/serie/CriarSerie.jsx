import {
    Form,
    Input,
    Button,
    Select,
    Col,
    Row,
    Space,
    Modal,
    Typography,
    Divider,
    Checkbox
  } from 'antd';
  
  //const { Option } = Select;
  
  export default ({ tipo = 'Serie' }) => {
    const [form] = Form.useForm();
  
    const onFinish = values => {
      Modal.success({
        content: `${tipo} criada com sucesso!`,
      });
    };
  
    const onReset = () => {
      form.resetFields();
    };
  
    const onFill = () => {
      form.setFieldsValue({
        'serie': '8',
      });
    };
  
    return (
      <>
        <Row gutter={24}>
          <Col span={24}>
            <Divider orientation="left" plain>
              <Typography.Title level={2}>Cadastro de {tipo}</Typography.Title>
            </Divider>
          </Col>
        </Row>
        <Form layout='vertical' form={form} name="serie-ano" onFinish={onFinish}>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="serie" label="Série" rules={[{ required: true, message: 'Obrigatório' }]}>
                <Input placeholder='8' />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="disciplinas" label="Disciplinas desta série" rules={[{ required: true, message: 'Obrigatório' }]}>
                <Checkbox.Group style = {{width:'100%'}}>
                  <Row>
                    <Col span={8}>
                      <Checkbox value = "arte">Arte</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value = "biologia">Biologia</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value = "ciencias">Ciências</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value = "edFisica">Ed.Fisica</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value = "ensReligioso">Ens.Religioso</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value = "fisica">Física</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value = "geografia">Geografia</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value = "historia">Hisória</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value = "ingles">Inglês</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value = "matematica">Matemática</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value = "portugues">Português</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value = "quimica">Química</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Space size='small'>
              <Button shape='round' size='large' type="primary" htmlType="submit">
                Submit
            </Button>
              <Button shape='round' size='large' htmlType="button" onClick={onReset}>
                Reset
          </Button>
              <Button shape='round' size='large' type="link" htmlType="button" onClick={onFill}>
                Fill form
          </Button>
            </Space>
          </Form.Item>
        </Form>
      </>
    );
  };