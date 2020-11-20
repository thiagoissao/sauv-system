import React from 'react';
import { Button, Dropdown, Menu, Tooltip } from 'antd'
import store, { logoffUser } from '../redux/auth';
import { useHistory } from 'react-router-dom';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import useUser from '../hooks/useUser'
import { roles } from '../models/roles';

const MenuHeader = () => {
  const history = useHistory()
  const user = useUser()
  const userData = user.getUser()

  const handleLogout = () => {
    store.dispatch(logoffUser())
    history.push('/login')
  }

  const handleClick = ({ key }) => {
    switch (key) {
      case 'logout':
        return handleLogout()
      default:
        break;
    }
  }

  const menu = (
    <Menu onClick={handleClick} mode="horizontal">
      <Menu.Item style={{ borderRadius: '24px', textAlign: 'center' }} key="logout">
        <LogoutOutlined /> Sair
      </Menu.Item>
    </Menu>
  )

  console.log(user.getUser())
  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Tooltip placement='left' color='#0091ea' title={`Papel: ${roles[userData?.role]}`}>
        <Button
          icon={<UserOutlined />}
          shape='round'
          size='large'
          onClick={e => e.preventDefault()}>
          {userData?.primeiroNome || 'Usuário'}
        </Button>
      </Tooltip>
    </Dropdown>
  );
}

export default MenuHeader;
