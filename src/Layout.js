import React, { useState } from 'react'
import { Menu, Layout as AntdLayout, Row, Col } from 'antd';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import Login from './components/login/Login';
import LoginButton from './components/login/LoginButton';
import store from './redux/auth';

const { SubMenu } = Menu;


const Layout = ({
  menuOptions,
  onClick,
  selectedKeys,
}) => {
  const { Content, Header, Sider } = AntdLayout
  const { loggedIn } = store.getState()

  if (!loggedIn) return <Redirect to="/login" />

  return (
    <AntdLayout>
      <Header style={{ backgroundColor: '#03a9f4' }} >
        <Row justify='space-between'>
          <Col>
            <h1 style={{ color: 'white' }}>
              <b>Sistema Acadêmico Universal - SAUV</b>
            </h1>
          </Col>
          <Col>
            <LoginButton />
          </Col>
        </Row>
      </Header>
      <AntdLayout>
        <Sider style={{ background: 'white' }}>
          <Menu
            onClick={onClick}
            selectedKeys={selectedKeys}
            mode="inline"
          >
            {
              Object.entries(menuOptions).map(([chave, { icon, label, opcoes }]) => {
                return (
                  <SubMenu
                    key={chave}
                    title={
                      <span>
                        {icon}
                        <span>{label}</span>
                      </span>
                    }
                  >
                    {Object.entries(opcoes).map(([itemChave, { label }]) => (
                      <Menu.Item key={`${chave}:${itemChave}`}>
                        <span>{label}</span>
                        <Link to={`/${chave}/${itemChave}`} />
                      </Menu.Item>
                    ))}
                  </SubMenu>
                )
              })
            }
          </Menu>
        </Sider>
        <Content style={{ padding: 16, background: '#e1f5fe' }}>
          <Switch>
            {
              Object.entries(menuOptions).map(([chave, { opcoes }]) =>
                Object.entries(opcoes).map(([itemChave, { component }]) => (
                  <Route key={`/${chave}/${itemChave}`} path={`/${chave}/${itemChave}`} component={component} />
                ))
              )
            }
          </Switch>
        </Content>
      </AntdLayout>
    </AntdLayout>
  );
}
export default Layout
