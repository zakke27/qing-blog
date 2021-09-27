/** @jsxImportSource  @emotion/react */
import { css, jsx } from '@emotion/react'
import React, { useState } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import styled from '@emotion/styled'
import { Layout, Menu } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MailOutlined
} from '@ant-design/icons'
import AuthRoute from '../../routes/AuthRoute'

const { SubMenu } = Menu
const { Header, Sider, Content } = Layout

const AdminContainer = styled(Layout)`
  margin-top: -5rem;
  background-color: lightblue;
  min-width: 1440px;
`
const Sidebar = styled(Sider)`
  height: 95vh;
`

const LogoBox = styled.div`
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
`

const HeaderBox = styled(Header)`
  background: #fff;
  padding: 0;
`
const ContentBox = styled(Content)`
  background-color: lightgreen;
  padding: 15px;
`

const ToggleBox = styled.div`
  width: 64px;
  height: 64px;
  padding: 0 24px;
  font-size: 18px;
  line-height: 64px;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #1890ff;
  }
`

const Admin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  return (
    <AdminContainer>
      <Sidebar trigger={null} collapsible collapsed={collapsed}>
        <LogoBox />
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1" icon={<VideoCameraOutlined />}>
            <Link to="/admin/hello">首页</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            用户管理
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            文章管理
          </Menu.Item>
          <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
            <Menu.Item key="4">Option 1</Menu.Item>
            <Menu.Item key="5">Option 2</Menu.Item>
            <Menu.Item key="6">Option 3</Menu.Item>

            <Menu.Item key="7">Option 4</Menu.Item>
          </SubMenu>
        </Menu>
      </Sidebar>
      <Layout>
        <HeaderBox>
          <ToggleBox onClick={toggle}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </ToggleBox>
        </HeaderBox>
        {/* 动态内容区 */}
        <ContentBox>
          <Switch>
            {/* <Route path="/admin">1</Route> */}
            <AuthRoute path="/admin/hello" roles={[0]}>
              <h3>11</h3>
            </AuthRoute>
          </Switch>
        </ContentBox>
      </Layout>
    </AdminContainer>
  )
}

export default Admin
