/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React, { useState, useEffect } from 'react'
import { EllipsisOutlined } from '@ant-design/icons'
import { Divider, Tabs, List, Button } from 'antd'
import * as useApi from '../../api/user'
import { getUser } from '../../utils/Auth'

const { TabPane } = Tabs

const BlogControl = () => {
  const [userPost, setUserPost] = useState([])

  const user = getUser()

  useEffect(() => {
    useApi
      .userPostByUid(user.id)
      .then(res => {
        console.log(res)
        setUserPost(res.data)
      }, [])
      .catch(err => {
        console.log(err)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div css={css``}>
      <div
        css={css`
          /* background-color: lightcyan; */
        `}
      >
        <Tabs>
          <TabPane tab={`全部（${userPost.length}）`} key="1">
            <List
              itemLayout="horizontal"
              dataSource={userPost}
              renderItem={post => (
                <List.Item
                  actions={[
                    <a key="list-loadmore-edit">编辑</a>,
                    <Button type="text" danger key="list-delete">
                      删除
                    </Button>
                  ]}
                >
                  <List.Item.Meta title={post.title} />
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab={`审核中（${userPost.filter(post => post.status === 0).length}）`} key="2">
            <List
              itemLayout="horizontal"
              dataSource={userPost.filter(post => post.status === 0)}
              renderItem={post => (
                <List.Item
                  actions={[
                    <a key="list-loadmore-edit">编辑</a>,
                    <Button type="text" danger key="list-delete">
                      删除
                    </Button>
                  ]}
                >
                  <List.Item.Meta title={post.title} />
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab={`已通过（${userPost.filter(post => post.status === 1).length}）`} key="3">
            <List
              itemLayout="horizontal"
              dataSource={userPost.filter(post => post.status === 1)}
              renderItem={post => (
                <List.Item
                  actions={[
                    <a key="list-loadmore-edit">编辑</a>,
                    <Button type="text" danger key="list-delete">
                      删除
                    </Button>
                  ]}
                >
                  <List.Item.Meta title={post.title} />
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab={`未通过（${userPost.filter(post => post.status === 2).length}）`} key="4">
            <List
              itemLayout="horizontal"
              dataSource={userPost.filter(post => post.status === 2)}
              renderItem={post => (
                <List.Item
                  actions={[
                    <a key="list-loadmore-edit">编辑</a>,
                    <Button type="text" danger key="list-delete">
                      删除
                    </Button>
                  ]}
                >
                  <List.Item.Meta title={post.title} />
                </List.Item>
              )}
            />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default BlogControl
