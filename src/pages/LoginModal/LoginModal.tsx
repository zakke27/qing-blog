/** @jsxImportSource  @emotion/react */
import { css, jsx } from '@emotion/react'
import React, { useState } from 'react'
import { Modal, Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { login, register, ILoginParams, IRegisterParams } from '../../api/user'
import { setToken, setUser } from '../../utils/Auth'

interface Props {
  modalVisible: boolean
  showModal: () => void
}

const LoginModal: React.FC<Props> = ({ modalVisible, showModal }) => {
  const [modalTitle, setModalTitle] = useState('登录')
  const [form] = Form.useForm()

  // 登录
  const handleLogin = (userInfo: ILoginParams) => {
    login(userInfo)
      .then(res => {
        console.log(res)
        if (res.data?.id) {
          setToken('1q2w3e4r5t6y0')
          setUser(res.data)
          showModal()
          message.success('登录成功', 2)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  // 注册
  const handleRegister = (userInfo: IRegisterParams) => {
    register(userInfo)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
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
                  已有账户?
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
