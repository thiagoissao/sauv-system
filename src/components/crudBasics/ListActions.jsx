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
import useUser from '../../hooks/useUser';
import { allRoles } from '../../models/roles';

const ListActions = ({
  componentForm,
  formatterView,
  record,
  enableViewFor = allRoles,
  enableEditFor = allRoles,
  enableDeleteFor = allRoles,
  disableView = false,
  disableEdit = false,
  disableDelete = false,
  formWidth = 1200
}) => {
  const user = useUser()
  const [openView, setOpenView] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  return (
    <>
      {
        formatterView && record && (
          <Modal
            title='Detalhes'
            visible={openView}
            onCancel={() => setOpenView(false)}
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
      {
        componentForm && record && (
          <Modal
            width={formWidth}
            visible={openEdit}
            onCancel={() => setOpenEdit(false)}
            footer={null}
          >
            {componentForm}
          </Modal>
        )
      }
      <Space>
        {!disableView && user.enableField(enableViewFor) && <Button onClick={() => setOpenView(true)} shape='circle' type="primary" icon={<EyeOutlined />} />}
        {!disableEdit && user.enableField(enableEditFor) && <Button onClick={() => setOpenEdit(true)} shape='circle' type="primary" icon={<EditOutlined />} />}
        {!disableDelete && user.enableField(enableDeleteFor) && <Popconfirm
          title="Deletar esse registro?"
          onConfirm={() => message.success('Ação de deleção lógica!')}
          okText="Sim"
          cancelText="Não"
        >
          <Button shape='circle' type='default' icon={<DeleteOutlined />} />
        </Popconfirm>}
      </Space>
    </>
  )
}

export default ListActions
