/** @jsxImportSource  @emotion/react */
import { css, jsx } from '@emotion/react'
import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { List, Avatar, Button, message } from 'antd'
import { getFollowUserList, unFollowUser } from '../../api/user'
import { getUser } from '../../utils/Auth'
import { NewUnFollow } from '../../types/interfaces'

const FollowContainer = styled.div`
  display: flex;
  flex-flow: row;
  /* background-color: lightgreen; */
  width: 700px;
`
const Content = styled.div`
  flex: 3;
  background-color: #ffffff;
  /* margin-right: 1.5rem; */
  height: 100%;
`
interface FollowUser {
  userid: number
  friendid: number
  username: string
}
type FollowUserList = FollowUser[]

const Follow: React.FC = () => {
  const [followList, setFollowList] = useState<FollowUserList>()

  const fetchFollowList = async () => {
    try {
      const res = await getFollowUserList(getUser()?.userid)
      if (res.data) {
        console.log(res)
        setFollowList(res.data)
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchFollowList()
  }, [])

  // 取消关注
  const handleUnFollow = (followUser: FollowUser) => {
    return async () => {
      const newUnFollow: NewUnFollow = {
        userid: getUser()?.userid,
        friendid: followUser.friendid
      }
      try {
        const res = await unFollowUser(newUnFollow)
        if (res.data.code === 301) {
          console.log({ res })
          fetchFollowList()
          message.success('取消关注成功', 2)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <FollowContainer>
      <Content>
        <List
          itemLayout="horizontal"
          dataSource={followList}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                css={css`
                  padding: 5px;
                `}
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<div>{item.username}</div>}
              />
              <Button
                onClick={handleUnFollow(item)}
                css={css`
                  margin-right: 10px;
                `}
              >
                已关注
              </Button>
            </List.Item>
          )}
        />
      </Content>
    </FollowContainer>
  )
}

export default Follow
