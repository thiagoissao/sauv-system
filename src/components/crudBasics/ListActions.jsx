import React, { useState } from 'react'
import {
  Button,
  Space,
  Popconfirm,
  message,
  Modal,
  Row,
  Col
} from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons'

const ListActions = ({ onClickEdit, formatterView, record }) => {

  const [open, setOpen] = useState(false)

  return (
    <>
      {
        formatterView && record && (
          <Modal
            title='Detalhes'
            visible={open}
            onCancel={() => setOpen(false)}
            footer={null}
          >
            {
              Object.entries(record).map(([key, value]) => (
                <Row gutter={24}>
                  <Col>
                    <p><b>{formatterView[key]}:</b></p>
                  </Col>
                  <Col>
                    <p>{value}</p>
                  </Col>
                </Row>
              ))
            }
          </Modal>
        )
      }
      <Space>
        <Button onClick={onClickEdit} shape='circle' type="primary" icon={<EditOutlined />} />
        <Button onClick={() => setOpen(true)} shape='circle' type="primary" icon={<EyeOutlined />} />
        <Popconfirm
          title="Deletar esse registro?"
          onConfirm={() => message.success('Ação de deleção lógica!')}
          okText="Sim"
          cancelText="Não"
        >
          <Button shape='circle' type='default' icon={<DeleteOutlined />} />
        </Popconfirm>
      </Space>
    </>
  )
}

export default ListActions
