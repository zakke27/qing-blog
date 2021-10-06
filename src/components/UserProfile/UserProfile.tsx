/** @jsxImportSource  @emotion/react */
import { css, jsx } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import { Form, Input, Button, message, Divider, Upload, Avatar, Radio } from 'antd'
import { getUser } from '../../utils/Auth'
import { UserProfileParams } from '../../types/interfaces'
import { getProfile, updateProfile } from '../../api/user'
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
`

interface UserInfo extends UserProfileParams {
  portrait?: null
}

const UserProfile: React.FC = () => {
  const [form] = Form.useForm()

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

  const fetchUserProfile = async () => {
    try {
      const res = await getProfile(getUser()?.userid)
      if (res?.data) {
        console.log(res)
        form.setFieldsValue(res.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchUserProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateUserProfile = async (user: UserProfileParams) => {
    console.log(user)
    const temp = {
      userid: getUser()?.userid,
      name: user.name ?? '',
      age: Number(user.age) ?? 18,
      sex: user.sex ?? '男',
      introduction: user.introduction ?? ''
    }
    try {
      const res = await updateProfile(temp)
      if (res?.data.code === 2007) {
        console.log(res)
        message.success('个人资料修改成功', 2)
      }
    } catch (error) {
      console.error(error)
    }
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
          onFinish={updateUserProfile}
          labelAlign="left"
          colon={false}
          labelCol={{ offset: 1, span: 3 }}
          wrapperCol={{ offset: 1, span: 15 }}
          form={form}
          css={css`
            padding: 0 20px;
          `}
        >
          <Form.Item
            label="用户名"
            name="username"
            initialValue={getUser()?.username ?? ''}
            required
          >
            <Input disabled />
          </Form.Item>
          <Divider />
          <Form.Item label="昵称" name="name" required>
            <Input />
          </Form.Item>
          <Divider />
          <Form.Item label="性别" name="sex" required>
            <Radio.Group>
              <Radio value="男">男</Radio>
              <Radio value="女">女</Radio>
            </Radio.Group>
          </Form.Item>
          <Divider />
          <Form.Item label="年龄" name="age" required>
            <Input type="number" />
          </Form.Item>
          <Divider />
          <Form.Item label="个人介绍" name="introduction" required>
            <Input.TextArea
              showCount
              maxLength={100}
              // value={userInfo?.introduction}
              placeholder="填写个人介绍"
            />
          </Form.Item>
          <Divider />
          <Form.Item
            css={css`
              margin-left: 6.5rem;
              margin-top: 2rem;
            `}
          >
            <Button type="primary" htmlType="submit">
              保存修改
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div
        css={css`
          flex: 1;
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
