/** @jsxImportSource  @emotion/react */
import { css, jsx } from '@emotion/react'
import React, { useState } from 'react'
import { Switch, Route, Link, useLocation, useHistory } from 'react-router-dom'
import styled from '@emotion/styled'
import { Layout, Menu } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  HomeOutlined,
  ReadOutlined
} from '@ant-design/icons'
import AuthRoute from '../../routes/AuthRoute'
import AdminUserControl from '../../components/AdminUserControl/AdminUserControl'
import AdminArticleControl from '../../components/AdminArticleControl/AdminArticleControl'

const { SubMenu } = Menu
const { Header, Sider, Content } = Layout

const AdminContainer = styled(Layout)`
  margin-top: -4.6rem;
  /* background-color: lightblue; */
  min-width: 1440px;
`
const Sidebar = styled(Sider)`
  height: 90vh;
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
  padding: 20px 0 0 20px;
  /* background-color: gray; */
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
  const history = useHistory()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  return (
    <AdminContainer>
      <Sidebar trigger={null} collapsible collapsed={collapsed}>
        <LogoBox
          onClick={() => {
            history.push('/')
          }}
          css={css`
            cursor: pointer;
          `}
        />
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
          <Menu.Item key="/admin" icon={<HomeOutlined />}>
            <Link to="/admin">首页</Link>
          </Menu.Item>
          <Menu.Item key="/admin/user-control" icon={<UserOutlined />}>
            <Link to="/admin/user-control">用户管理</Link>
          </Menu.Item>
          <Menu.Item key="/admin/article-control" icon={<ReadOutlined />}>
            <Link to="/admin/article-control"> 文章管理</Link>
          </Menu.Item>
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
            <AuthRoute exact path="/admin" roles={[0]}>
              <h3>11</h3>
            </AuthRoute>
            <AuthRoute path="/admin/user-control" roles={[0]}>
              <AdminUserControl />
            </AuthRoute>
            <AuthRoute path="/admin/article-control" roles={[0]}>
              <AdminArticleControl />
            </AuthRoute>
          </Switch>
        </ContentBox>
      </Layout>
    </AdminContainer>
  )
}

export default Admin
