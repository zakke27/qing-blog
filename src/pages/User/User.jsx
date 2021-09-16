/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import styled from '@emotion/styled'
import { Link, Switch, Route, Redirect, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { ControlOutlined, FundOutlined, SolutionOutlined } from '@ant-design/icons'
import Dashboard from '../../components/Dashboard/Dashboard'
import BlogControl from '../../components/BlogControl/BlogControl'
import Profile from '../../components/Profile/Profile'

const Span = styled.span`
  font-size: 14px;
`

const User = () => {
  let location = useLocation()
  return (
    <div
      css={css`
        min-width: 1200px;
        height: 100vh;
        font-size: 16px;
        /* display: flex; */
      `}
    >
      <nav
        css={css`
          background-color: white;
          position: fixed;
          width: 240px;
          height: 80%;
          padding: 15px;
        `}
      >
        <div
          css={css`
            margin-top: 20px;
          `}
        >
          <Menu
            mode="vertical"
            defaultOpenKeys={['/user/dashboard']}
            selectedKeys={[location.pathname]}
            css={css`
              border: none;
              margin-left: 10px;
            `}
          >
            <Menu.Item key="/user/dashboard">
              <Link to="/user/dashboard">
                <FundOutlined />
                <Span>Dashboard</Span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/user/blog-control">
              <Link to="/user/blog-control">
                <ControlOutlined />
                <Span>博客管理</Span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/user/profile">
              <Link to="/user/profile">
                <SolutionOutlined />
                <Span>个人资料</Span>
              </Link>
            </Menu.Item>
          </Menu>
        </div>
      </nav>
      <div
        css={css`
          background-color: white;
          margin-left: 264px;
          width: calc(100% - 264px);
          height: 100%;
          padding: 10px;
        `}
      >
        <Switch>
          <Route path="/user/dashboard">
            <Dashboard />
          </Route>
          <Route path="/user/blog-control">
            <BlogControl />
          </Route>
          <Route path="/user/profile">
            <Profile />
          </Route>
          <Route path="/user">
            <Redirect to="/user/dashboard" />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default User
