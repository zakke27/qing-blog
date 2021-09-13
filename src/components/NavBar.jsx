/** @jsx jsx **/
import { css, jsx } from '@emotion/react'
import styled from '@emotion/styled'
import { Layout, Input, Menu, Avatar, Dropdown, Button } from 'antd'
import { SettingOutlined, PoweroffOutlined } from '@ant-design/icons'
import { Link, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getUser, getToken, removeAll } from '../utils/Auth'

const Span = styled.span`
  margin-left: 10px;
`

const NavBar = props => {
  const { Header } = Layout
  const { Search } = Input
  let history = useHistory()

  // props
  const { showModal } = props

  const onSearch = value => {
    console.log(value)
  }

  // 跳转写文章路由
  const WriteBlog = () => {
    if (getToken()) {
      console.log(111)
      history.push('/write')
    } else {
      showModal()
    }
  }

  // 退出登录
  const logout = () => {
    removeAll()
    location.reload()
  }

  return (
    <Header
      css={css`
        position: fixed;
        top: 0;
        z-index: 1;
        width: 100%;
        /* height: 100%; */
        /* height: 60px; */
        background-color: white;
        font-size: 16px;
      `}
    >
      <div
        css={css`
          width: 960px;
          margin: 0 auto;
          /* background-color: green; */
          display: flex;
          justify-content: space-between;
        `}
      >
        <div className="logo">轻 blog</div>
        <nav
          css={css`
            display: flex;
            align-items: center;
            background-color: white;
          `}
        >
          <li
            css={css`
              margin: 0 10px;
              display: flex;
              justify-content: center;
              align-items: center;
            `}
          >
            <Menu mode="horizontal" theme="light">
              <Menu.Item key="1" className="菜单111">
                <Link to="/">首页</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/hot">热门</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/history">历史</Link>
              </Menu.Item>
            </Menu>
          </li>
          <li
            css={css`
              width: 350px;
              display: flex;
              align-items: center;
              margin: 0 40px;
            `}
          >
            <Search placeholder="搜索你感兴趣的内容" size="large" allowClear onSearch={onSearch} />
          </li>
          <li>
            <div css={css``}>
              <Button type="primary" onClick={WriteBlog}>
                写文章
              </Button>
              {getToken() ? (
                <Dropdown
                  trigger={['click']}
                  placement="bottomCenter"
                  arrow
                  overlay={
                    <Menu>
                      <Menu.Item key="1">
                        <SettingOutlined />
                        <Span>文章管理</Span>
                      </Menu.Item>
                      <Menu.Item key="2">
                        <SettingOutlined />
                        <Span>设置</Span>
                      </Menu.Item>
                      <Menu.Item key="3" onClick={logout}>
                        <PoweroffOutlined />
                        <Span>退出</Span>
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <Avatar
                    className="avatar"
                    src={getUser().avatar || null}
                    size="large"
                    css={css`
                      cursor: pointer;
                      border: 1px solid silver;
                      margin-left: 60px;
                    `}
                  />
                </Dropdown>
              ) : (
                <Button
                  type="default"
                  onClick={showModal}
                  css={css`
                    margin-left: 40px;
                    color: #1890ff;
                    border-color: #1890ff;
                  `}
                >
                  登录
                </Button>
              )}
            </div>
          </li>
        </nav>
      </div>
    </Header>
  )
}

NavBar.propTypes = {
  showModal: PropTypes.func
}

export default NavBar