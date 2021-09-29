/** @jsxImportSource  @emotion/react */
import { css, jsx } from '@emotion/react'
import React, { useState } from 'react'
import { Modal, Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { login, register } from '../../api/user'
import { setUser } from '../../utils/Auth'
import { LoginParams } from '../../types/interfaces'

type RegisterParams = LoginParams

interface Props {
  modalVisible: boolean
  showModal: () => void
}

const LoginModal: React.FC<Props> = ({ modalVisible, showModal }) => {
  const [modalTitle, setModalTitle] = useState('登录')
  const [form] = Form.useForm()

  // 登录
  const handleLogin = async (userInfo: LoginParams) => {
    setUser({
      userid: 2,
      username: 'zakke',
      password: 'sq1e1',
      identity: 0,
      accountstatus: 1
    }) // TODO just test
    try {
      const res = await login(userInfo)
      // 登录成功
      if (res.data?.accountstatus === 1) {
        setUser(res.data)
        showModal()
        message.success('登录成功', 2)
      }
      if (res.data?.accountstatus === 0) {
        message.success('该账户封禁中，请联系管理员', 2)
      }
      // 用户名或密码错误
      if (res.data === '') {
        message.warn('用户名或密码错误', 2)
      }
    } catch (error) {
      console.error(error)
    }
  }

  // 注册
  const handleRegister = async ({ username, password }: RegisterParams) => {
    const userInfo = {
      username,
      password
    }
    try {
      const res = await register(userInfo)
      if (res.data?.code === 2004) {
        // 注册失败，用户名已存在
        message.warn('注册失败，用户名已存在', 2)
      }
      if (res.data?.code === 2005) {
        setModalTitle('登录')
        message.success('注册成功', 2)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Modal
      centered
      title={modalTitle}
      visible={modalVisible}
      maskClosable={false}
      destroyOnClose={true}
      footer={null}
      onCancel={showModal}
    >
      <div>
        <Form
          size="large"
          preserve={false}
          onFinish={modalTitle === '登录' ? handleLogin : handleRegister}
          form={form}
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
          {/* if register */}
          {modalTitle === '注册' ? (
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
          ) : null}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              css={css`
                width: 100%;
              `}
            >
              {modalTitle}
            </Button>
            <div
              css={css`
                margin-top: 1rem;
              `}
            >
              {modalTitle === '登录' ? (
                // 登录时
                <div>
                  没有账户？
                  <a
                    onClick={() => {
                      setModalTitle('注册')
                      form.resetFields()
                    }}
                  >
                    现在注册！
                  </a>
                </div>
              ) : (
                // 注册时
                <div>
                  已有账户？
                  <a
                    onClick={() => {
                      setModalTitle('登录')
                      form.resetFields()
                    }}
                  >
                    现在登录
                  </a>
                </div>
              )}
            </div>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}

export default LoginModal
