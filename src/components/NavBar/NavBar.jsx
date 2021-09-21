/** @jsx jsx **/
import { css, jsx } from '@emotion/react'
import styled from '@emotion/styled'
import { Layout, Input, Menu, Avatar, Dropdown, Button } from 'antd'
import { PoweroffOutlined, ReadOutlined } from '@ant-design/icons'
import { Link, useHistory, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getUser, getToken, removeAll } from '../../utils/Auth'

const Span = styled.span`
  margin-left: 10px;
`

const NavBar = props => {
  const { Header } = Layout
  const { Search } = Input
  let history = useHistory()
  let location = useLocation()

  // props
  const { showModal } = props

  const onSearch = value => {
    console.log(value)
  }

  // 跳转写文章路由
  const WriteBlog = () => {
    if (getToken()) {
      history.push('/write')
    } else {
      showModal()
    }
  }

  // 退出登录
  const logout = () => {
    removeAll()
    window.location.reload()
  }

  return (
    <Header
      css={css`
        position: fixed;
        top: 0;
        z-index: 1;
        width: 100%;
        border-top: 2px solid #1890ff;
        background-color: white;
        font-size: 18px;
        box-sizing: content-box;
      `}
    >
      <div
        css={css`
          width: 960px;
          margin: 0 auto;
          /* background-color: green; */
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <div className="logo">轻 blog</div>
        <nav
          css={css`
            display: flex;
            align-items: center;
            /* background-color: green; */
          `}
        >
          <Menu
            mode="horizontal"
            theme="light"
            selectedKeys={[location.pathname]}
            css={css`
              /* background-color: lightcoral; */
              margin: 1px 10px;
              font-size: 16px;
              display: flex;
              align-items: center;
              .ant-menu-title-content {
                a {
                  color: #7f7f7f;
                }
              }
            `}
          >
            <Menu.Item key="/">
              <Link to="/">首页</Link>
            </Menu.Item>
            <Menu.Item key="/hot">
              <Link to="/hot">热门</Link>
            </Menu.Item>
            <Menu.Item key="/history">
              <Link to="/history">历史</Link>
            </Menu.Item>
          </Menu>

          <Search
            placeholder="搜索你感兴趣的内容"
            size="large"
            allowClear
            onSearch={onSearch}
            css={css`
              width: 350px;
              display: flex;
              align-items: center;
              margin: 0 40px;
            `}
          />

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
                      <Link to="/user">
                        <ReadOutlined />
                        <Span>个人中心</Span>
                      </Link>
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
        </nav>
      </div>
    </Header>
  )
}

NavBar.propTypes = {
  showModal: PropTypes.func
}

export default NavBar
