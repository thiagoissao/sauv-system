import React from 'react'
import { Menu, Layout as AntdLayout } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const { SubMenu } = Menu;

const Layout = ({ menuOptions, onClick, selectedKeys }) => {
  const { Content, Header, Sider } = AntdLayout

  return (
    <Router>
      <AntdLayout>
        <Header style={{ backgroundColor: 'white' }}>
          Sistema Sauv
      </Header>
        <AntdLayout>
          <Sider style={{ background: 'white' }}>
            <Menu
              onClick={onClick}
              selectedKeys={selectedKeys}
              mode="inline"
            >
              {
                Object.entries(menuOptions).map(([chave, { label, opcoes }]) => {
                  return (
                    <SubMenu
                      key={chave}
                      title={label}
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
            {
              Object.entries(menuOptions).map(([chave, { opcoes }]) =>
                Object.entries(opcoes).map(([itemChave, { component }]) => (
                  <Route exact path={`/${chave}/${itemChave}`} component={component} />
                ))
              )
            }
          </Content>
        </AntdLayout>
      </AntdLayout>
    </Router>
  );
}
export default Layout
