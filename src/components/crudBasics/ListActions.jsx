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
import { useHistory } from 'react-router-dom';

const ListActions = ({ formatterView, record, disableView = false }) => {
  const history = useHistory()
  const [open, setOpen] = useState(false)


  const handleClickEdit = () => {
    history.push(`${history.location.pathname}/${record.id}`)
  }

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
                <Row gutter={24} key={value}>
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
        <Button onClick={handleClickEdit} shape='circle' type="primary" icon={<EditOutlined />} />
        {!disableView && <Button onClick={() => setOpen(true)} shape='circle' type="primary" icon={<EyeOutlined />} />}
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
