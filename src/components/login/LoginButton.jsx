import React from 'react';
import { Popconfirm, Button } from 'antd'
import { LogoutOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom'
import store, { logoffUser } from '../../redux/login';

const LoginButton = () => {
  const history = useHistory()

  const handleLogout = () => {
    store.dispatch(logoffUser())
    history.push('/login')
  }

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
