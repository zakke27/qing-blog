/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import styled from '@emotion/styled'
import { Link, Switch, Route, Redirect, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { ControlOutlined, FundOutlined, SolutionOutlined } from '@ant-design/icons'
import Dashboard from '../../components/Dashboard/Dashboard'
import ArticleControl from '../../components/ArticleControl/ArticleControl'
import Profile from '../../components/Profile/Profile'

const Span = styled.span`
  font-size: 14px;
`

const User = () => {
  let location = useLocation()
  return (
    <main
      css={css`
        min-width: 1200px;
        font-size: 16px;
        margin-bottom: 24px;
      `}
    >
      <nav
        css={css`
          background-color: white;
          position: fixed;
          width: 240px;
          min-height: calc(100vh - 120px);
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
            <Menu.Item key="/user/article-control">
              <Link to="/user/article-control">
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
          margin-left: 264px;
          width: calc(100% - 264px);
        `}
      >
        <div
          css={css`
            background-color: white;
            min-height: calc(100vh - 120px);
            padding: 10px 20px;
          `}
        >
          <Switch>
            <Route path="/user/dashboard">
              <Dashboard />
            </Route>
            <Route path="/user/article-control">
              <ArticleControl />
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
    </main>
  )
}

export default User
