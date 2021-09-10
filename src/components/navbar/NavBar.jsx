import React from 'react'
import './NavBar.scss'
import logo from '../../assets/images/logo.svg'
import { Layout, Input, Menu, Avatar, Dropdown, Button } from 'antd'
import { UserOutlined, SettingOutlined, PoweroffOutlined } from '@ant-design/icons'
import { Link, useHistory } from 'react-router-dom'
import { getToken, removeToken } from '../../utils/Auth'
import PropTypes from 'prop-types'

const NavBar = ({ showLoginModal }) => {
  let history = useHistory()

  const { Header } = Layout
  const { Search } = Input

  const onSearch = value => {
    console.log(value)
  }

  const logout = () => {
    removeToken()
    history.replace('/')
  }
  return (
    <Header className="navbar">
      <div className="logo">
        <img src={logo} className="logo-img" alt="logo" />
        <span>Just Write</span>
      </div>
      <Menu mode="horizontal" defaultSelectedKeys={'1'} style={{ margin: '0 10px' }}>
        <Menu.Item key="1">
          <Link to="/">首页</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/hot">热门</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/history">历史</Link>
        </Menu.Item>
      </Menu>
      <Search
        placeholder="搜索你感兴趣的内容"
        size="large"
        allowClear
        onSearch={onSearch}
        style={{ width: '30%' }}
      />
      <Button type="primary" style={{ margin: '0 20px' }}>
        撰写
      </Button>
      {getToken() ? (
        <Dropdown
          trigger={['click']}
          placement="bottomCenter"
          arrow
          overlay={
            <Menu>
              <Menu.Item key="1">
                <div onClick={logout}>
                  <PoweroffOutlined /> 退出
                </div>
              </Menu.Item>
            </Menu>
          }
        >
          <Avatar
            className="avatar"
            shape="square"
            size="large"
            icon={<UserOutlined />}
            style={{ cursor: 'pointer' }}
          />
        </Dropdown>
      ) : (
        <Button
          type="default"
          onClick={showLoginModal(true)}
          style={{ color: '#1890ff', borderColor: '#1890ff' }}
        >
          登录
        </Button>
      )}
    </Header>
  )
}

NavBar.propTypes = {
  showLoginModal: PropTypes.func
}

export default NavBar
