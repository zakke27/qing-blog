/** @jsx jsx **/
import { css, jsx } from '@emotion/react'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
// import { useHistory } from 'react-router-dom'
import * as userApi from '../api/user'
import PropTypes from 'prop-types'
import { setUser, setToken } from '../utils/Auth'

const Login = props => {
  const { changeModalTitle, showModal } = props
  // let history = useHistory()
  // login
  const handleLogin = userInfo => {
    userApi
      .userLogin(userInfo)
      .then(res => {
        console.log(res)
        if (res.data.code === 200) {
          setUser(res.data.userInfo)
          setToken(res.data.userInfo.token)
          showModal()
          message.success('登录成功', 2)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  // login failed
  const handleLoginFailed = error => {
    console.log('登录失败', error)
  }
  return (
    <Form
      size="large"
      name="normal_login"
      className="login-form"
      preserve={false}
      onFinish={handleLogin}
      onFinishFailed={handleLoginFailed}
    >
      <Form.Item
        name="username"
        label="账号"
        rules={[
          { required: true, message: '请输入你的账户！' },
          { min: 3, max: 12, message: '长度在3-12个字符' }
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        label="密码"
        rules={[{ required: true, message: '请输入你的密码！' }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          css={css`
            width: 100%;
          `}
        >
          登录
        </Button>
        <div style={{ marginTop: '1rem' }}>
          没有账户？
          <a onClick={changeModalTitle('注册')}>现在注册！</a>
        </div>
      </Form.Item>
    </Form>
  )
}

Login.propTypes = {
  changeModalTitle: PropTypes.func,
  showModal: PropTypes.func
}

export default Login
