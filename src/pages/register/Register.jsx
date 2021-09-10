import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import * as userApi from '../../api/user'

const Register = ({ setIsLoginModal }) => {
  // register
  const handleRegister = userInfo => {
    const { username, password } = userInfo
    const values = {
      username,
      password
    }
    // console.log(values)
    userApi
      .userRegister(values)
      .then(res => {
        console.log(res)
        if (res.data.code === 200) {
          message.success('注册成功', 3)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  // register failed
  const handleRegisterFailed = error => {
    console.log('注册失败', error)
  }
  return (
    <Form
      labelCol={{ span: 3 }}
      size="large"
      name="normal_register"
      onFinish={handleRegister}
      onFinishFailed={handleRegisterFailed}
    >
      <Form.Item
        name="username"
        label="账号"
        rules={[
          { required: true, message: '请输入你的账户名！' },
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
      <Form.Item
        name="confirm"
        label="确认"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '请确认你的密码！'
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('两次输入的密码不一致！'))
            }
          })
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Confirm Password"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="register-form-button"
          style={{ width: '100%' }}
        >
          注册
        </Button>
        <div style={{ marginTop: '1rem' }}>
          已有账户?
          <a
            onClick={() => {
              setIsLoginModal(true)
            }}
          >
            现在登录！
          </a>
        </div>
      </Form.Item>
    </Form>
  )
}

Register.propTypes = {
  setIsLoginModal: PropTypes.func
}

export default Register
