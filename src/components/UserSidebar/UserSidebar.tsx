/** @jsxImportSource  @emotion/react */
import { css } from '@emotion/react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from '@emotion/styled'
import { Menu } from 'antd'
import { ControlOutlined, FundOutlined, SolutionOutlined } from '@ant-design/icons'

const Sidebar = styled.nav`
  position: fixed;
  background-color: white;
  padding: 15px;
  width: 240px;
  min-height: calc(100vh - 120px);
`
const UserSidebar: React.FC = () => {
  const location = useLocation()
  return (
    <Sidebar>
      <div
        css={css`
          margin-top: 20px;
        `}
      >
        <Menu
          mode="vertical"
          defaultOpenKeys={['/user']}
          selectedKeys={[location.pathname]}
          css={css`
            border: none;
            margin-left: 10px;
          `}
        >
          <Menu.Item key="/user">
            <Link to="/user">
              <FundOutlined />
              <span>首页</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/user/article-control">
            <Link to="/user/article-control">
              <ControlOutlined />
              <span>文章管理</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/user/profile">
            <Link to="/user/profile">
              <SolutionOutlined />
              <span>个人资料</span>
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    </Sidebar>
  )
}
export default UserSidebar
