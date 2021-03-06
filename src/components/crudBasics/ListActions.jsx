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
import { customFetch } from '../../services/api'

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
  endpoint,
  formWidth = 1200
}) => {
  const user = useUser()
  const [openView, setOpenView] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const removeItem = async () => {
    if (!endpoint) {
      console.error('Passar a propriedade endpoint no componente ListActions')
      return
    }

    if (!record.id) {
      console.error('O registro não possui ID, portanto não é possível excluir o registro')
      return
    }
    const response = await customFetch(`${endpoint}/${record.id}`, { method: 'DELETE' })
    if (response.ok) {
      message.success('Registro deletado! Recarregue a página para ver as alterações')
      return
    }
    message.error('Erro na exclusão do registro')
  }

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
            {componentForm({ setOpenEdit })}
          </Modal>
        )
      }
      <Space>
        {!disableView && user.enableField(enableViewFor) && <Button onClick={() => setOpenView(true)} shape='circle' type="primary" icon={<EyeOutlined />} />}
        {!disableEdit && user.enableField(enableEditFor) && <Button onClick={() => setOpenEdit(true)} shape='circle' type="primary" icon={<EditOutlined />} />}
        {!disableDelete && user.enableField(enableDeleteFor) &&
          <Popconfirm
            title="Deletar esse registro?"
            onConfirm={removeItem}
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
