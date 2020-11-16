import React from 'react'
import { Button, Space, Popconfirm, message } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

const ListActions = ({ onClickEdit, onClickView }) => {
  return (
    <Space>
      <Button onClick={onClickEdit} shape='circle' type="primary" icon={<EditOutlined />} />
      <Button onClick={onClickView} shape='circle' type="primary" icon={<EyeOutlined />} />
      <Popconfirm
        title="Deletar esse registro?"
        onConfirm={() => message.success('Ação de deleção lógica!')}
        okText="Sim"
        cancelText="Não"
      >
        <Button shape='circle' type='default' icon={<DeleteOutlined />} />
      </Popconfirm>
    </Space>
  )
}

export default ListActions
