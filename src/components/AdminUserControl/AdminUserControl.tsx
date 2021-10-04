/** @jsxImportSource  @emotion/react */
import { css, jsx } from '@emotion/react'
import React from 'react'
import { Table, Tag, Space, Button, message } from 'antd'
import { User } from '../../types/interfaces'
import {
  getUserList,
  updateAccountStatusToBan,
  updateAccountStatusToPass
} from '../../api/admin'

const { Column } = Table

type UserList = User[]

interface Props {
  userList: UserList
  fetchUserList: () => void
}

const AdminUserControl: React.FC<Props> = ({ userList, fetchUserList }) => {
  // 封禁用户 HOC
  const banAccountStatus = (record: User) => {
    return async () => {
      const { userid } = record
      try {
        const res = await updateAccountStatusToBan(userid)
        if (res.data?.code === 2011) {
          console.log(res)
          fetchUserList()
          message.success('封禁成功', 2)
        }
        if (res.data?.code === 2012) {
          message.error('未知原因封禁失败，请重试', 2)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  // 解禁用户
  const passAccountStatus = (record: User) => {
    return async () => {
      const { userid } = record
      try {
        const res = await updateAccountStatusToPass(userid)
        if (res.data?.code === 2013) {
          console.log(res)
          fetchUserList()
          message.success('解禁成功', 2)
        }
        if (res.data?.code === 2014) {
          message.error('未知原因解禁失败，请重试', 2)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <Table
      dataSource={userList}
      rowKey="userid"
      pagination={{
        pageSize: 8
      }}
    >
      <Column title="id" dataIndex="userid" key="userid" />
      <Column title="用户名" dataIndex="username" key="username" />
      {/* <Column title="密码" dataIndex="password" key="password" /> */}
      <Column
        title="身份"
        dataIndex="identity"
        key="identity"
        render={identity => (
          <Tag color={identity === 0 ? 'orange' : 'blue'}>
            {identity === 0 ? '超级管理员' : '普通用户'}
          </Tag>
        )}
      />
      <Column
        title="账户状态 "
        dataIndex="accountstatus"
        key="accountstatus"
        render={accountstatus => (
          <Tag color="blue" key="accountstatus">
            {accountstatus === 0 ? '封禁中' : '正常'}
          </Tag>
        )}
      />
      <Column
        title="操作"
        key="action"
        render={(text, record: User) => (
          <Space size="middle">
            <Button
              css={css`
                display: ${record?.identity === 0 && 'none'};
              `}
              size="small"
              type="primary"
              danger={record?.accountstatus === 1}
              onClick={
                record.accountstatus === 0
                  ? passAccountStatus(record)
                  : banAccountStatus(record)
              }
            >
              {record.accountstatus === 0 ? '解禁此用户' : '封禁此用户'}
            </Button>
          </Space>
        )}
      />
    </Table>
  )
}

export default AdminUserControl
