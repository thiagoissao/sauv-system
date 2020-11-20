import React from 'react';
import { Popconfirm, Button } from 'antd'
import { LogoutOutlined } from '@ant-design/icons';

const LoginButton = () => {

  return (
    <Popconfirm
      placement='bottomLeft'
      title='Dejesa sair do sistema?'
      okText='Sim'
      cancelText='Não'
      onConfirm={handleLogout}
    >
      <Button
        icon={<LogoutOutlined />}
        shape='round'
        size='large'>
        Sair
      </Button>
    </Popconfirm>
  );
}

export default LoginButton;
