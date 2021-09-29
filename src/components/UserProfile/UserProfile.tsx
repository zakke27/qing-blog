/** @jsxImportSource  @emotion/react */
import { css, jsx } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { Form, Input, Button, message, Divider, Upload, Avatar } from 'antd'
import { getUser } from '../../utils/Auth'

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const UserProfile: React.FC = () => {
  const beforeUpload = (file: { type: string; size: number }) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  return (
    <ProfileContainer>
      <div
        css={css`
          flex: 3;
        `}
      >
        <h3>个人资料</h3>
        <Divider />
        <Form
          labelAlign="left"
          colon={false}
          labelCol={{ offset: 1, span: 3 }}
          wrapperCol={{ offset: 1, span: 15 }}
          css={css`
            padding: 0 20px;
          `}
        >
          <Form.Item
            label="用户名"
            name="username"
            initialValue={getUser()?.username ?? ''}
          >
            <Input disabled />
          </Form.Item>
          <Divider />
          <Form.Item label="个人介绍" name="introduction">
            <Input.TextArea showCount maxLength={100} placeholder="填写个人介绍" />
          </Form.Item>
          <Divider />
          <Form.Item
            css={css`
              margin-left: 6.5rem;
              margin-top: 2rem;
            `}
          >
            <Button type="primary">保存修改</Button>
          </Form.Item>
        </Form>
      </div>
      <div
        css={css`
          flex: 1;
          /* background-color: lightgreen; */
          margin: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}
      >
        <Upload name="avatar" showUploadList={false} beforeUpload={beforeUpload}>
          <Avatar
            size={88}
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            css={css`
              border: 1px solid silver;
              &:hover {
                cursor: pointer;
                ::before {
                  content: '点击修改头像';
                  font-size: 10px;
                  position: absolute;
                  width: 88px;
                  height: 88px;
                  top: 0;
                  left: 0;
                  color: #ffffff;
                  background-color: #000000;
                  opacity: 0.5;
                }
              }
            `}
          />
        </Upload>
        <h5
          css={css`
            margin-top: 0.5rem;
          `}
        >
          我的头像
        </h5>
        <p
          css={css`
            font-size: 9px;
            width: 150px;
            color: #86909c;
          `}
        >
          支持 jpg、png、jpeg 格式大小 2M 以内的图片
        </p>
      </div>
    </ProfileContainer>
  )
}

export default UserProfile
