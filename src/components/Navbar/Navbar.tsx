/** @jsxImportSource  @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Menu, Input, Button, Dropdown, Avatar } from 'antd'
import { PoweroffOutlined, FileMarkdownOutlined } from '@ant-design/icons'
import { getUser, removeAll } from '../../utils/Auth'
import { searchArticleList } from '../../api/article'

const Header = styled.header`
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
  background-color: #ffffff;
  border-top: 2px solid #1890ff;
  font-size: 18px;
  box-sizing: content-box;
`
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: lightgreen; //todo test */
  margin: 0 auto;
  width: 1052px;
  height: 60px;
`

const NavLeft = styled(Menu)`
  flex: 1;
  margin: 0 10px;
  font-size: 16px;
  border: none;
  .ant-menu-title-content {
    a {
      color: #7f7f7f;
    }
  }
`
const NavRight = styled.div`
  flex: 2;
  /* background-color: yellow; */
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Search = styled(Input.Search)`
  /* margin-left: -40px; */
  width: 300px;
`
const RoleButton = styled(Button)`
  background-color: #e8f3ff;
  color: #1e80ff;
  padding: 5px 16px;
  border: none;
  &:hover {
    background-color: #e8f3ff;
  }
`

const LoginButton = styled(Button)`
  color: #1890ff;
  border-color: #1890ff;
`

interface Props {
  showModal: () => void
}

const NavBar: React.FC<Props> = ({ showModal }) => {
  const history = useHistory()
  const location = useLocation()

  // write Article
  const writeArticle = () => {
    if (getUser()) {
      history.push('/user/write')
    } else {
      showModal()
    }
  }
  // admin center
  const goAdmin = () => {
    history.push('/admin')
  }
  // go user center
  const goUserCenter = () => {
    if (getUser()) {
      history.push('/user')
    } else {
      showModal()
    }
  }

  // logout
  const logout = () => {
    removeAll()
    history.replace('/')
    window.location.reload()
  }

  return (
    <Header>
      <Nav>
        <div className="logo">将年不负</div>
        <NavLeft mode="horizontal" theme="light" selectedKeys={[location.pathname]}>
          <Menu.Item key="/">
            <Link to="/">首页</Link>
          </Menu.Item>
          <Menu.Item key="/hot">
            <Link to="/hot">热门</Link>
          </Menu.Item>
          <Menu.Item key="/user/follow">
            <Link to="/user/follow">关注</Link>
          </Menu.Item>
          <Menu.Item key="/user/liked">
            <Link to="/user/liked">我赞过的</Link>
          </Menu.Item>
        </NavLeft>
        <NavRight>
          <Search
            placeholder="搜索你感兴趣的内容"
            size="large"
            // 模糊查询文章列表
            onSearch={value => {
              history.push(`/search?title=${value}`)
            }}
            allowClear
          />
          {getUser()?.identity === 0 ? (
            <RoleButton onClick={goAdmin}>管理员中心</RoleButton>
          ) : (
            <RoleButton onClick={goUserCenter}>用户中心</RoleButton>
          )}
          <Button type="primary" onClick={writeArticle}>
            <span>写文章</span>
            <FileMarkdownOutlined />
          </Button>
          {getUser() ? (
            <Dropdown
              trigger={['click']}
              overlay={
                <Menu>
                  <Menu.Item key="1" onClick={logout}>
                    <PoweroffOutlined />
                    <span> 退出</span>
                  </Menu.Item>
                </Menu>
              }
            >
              <Avatar
                size="large"
                css={css`
                  cursor: pointer;
                `}
                src={
                  'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' || null
                }
              />
            </Dropdown>
          ) : (
            <LoginButton type="default" onClick={showModal}>
              登录
            </LoginButton>
          )}
        </NavRight>
      </Nav>
    </Header>
  )
}

export default NavBar
