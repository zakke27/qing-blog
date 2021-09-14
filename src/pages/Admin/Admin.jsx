/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import styled from '@emotion/styled'
import { Menu } from 'antd'
import { UnorderedListOutlined } from '@ant-design/icons'

const Span = styled.span`
  margin-left: 10px;
`

const Admin = () => {
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
          height: 100%;
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
            css={css`
              border: none;
            `}
          >
            <Menu.Item key="1">
              <UnorderedListOutlined />
              <Span>文章管理</Span>
            </Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
            <Menu.Item key="3">Option 3</Menu.Item>
          </Menu>
        </div>
      </nav>
      <div
        css={css`
          background-color: white;
          margin-left: 264px;
          width: calc(100% - 264px);
          height: 100%;
        `}
      >
        22
      </div>
    </div>
  )
}

export default Admin
