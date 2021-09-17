/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { useState, useEffect } from 'react'
import { Tabs, List, Button } from 'antd'
import * as userApi from '../../api/user'
import { getUser } from '../../utils/Auth'

const { TabPane } = Tabs

const ArticleControl = () => {
  const [userArticle, setUserArticle] = useState([])

  const user = getUser()

  useEffect(() => {
    userApi
      .getUserArticleByUid(user.id)
      .then(res => {
        console.log(res)
        setUserArticle(res.data.userArticle)
      }, [])
      .catch(err => {
        console.log(err)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      <Tabs>
        <TabPane tab={`全部（${userArticle.length}）`} key="1">
          <List
            itemLayout="horizontal"
            dataSource={userArticle}
            renderItem={article => (
              <List.Item
                actions={[
                  <a key="list-loadmore-edit">编辑</a>,
                  <Button type="text" danger key="list-delete">
                    删除
                  </Button>
                ]}
              >
                <List.Item.Meta title={article.title} />
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane
          tab={`审核中（${userArticle.filter(article => article.status === 0).length}）`}
          key="2"
        >
          <List
            itemLayout="horizontal"
            dataSource={userArticle.filter(article => article.status === 0)}
            renderItem={article => (
              <List.Item
                actions={[
                  <a key="list-loadmore-edit">编辑</a>,
                  <Button type="text" danger key="list-delete">
                    删除
                  </Button>
                ]}
              >
                <List.Item.Meta title={article.title} />
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane
          tab={`已通过（${userArticle.filter(article => article.status === 1).length}）`}
          key="3"
        >
          <List
            itemLayout="horizontal"
            dataSource={userArticle.filter(article => article.status === 1)}
            renderItem={article => (
              <List.Item
                actions={[
                  <a key="list-loadmore-edit">编辑</a>,
                  <Button type="text" danger key="list-delete">
                    删除
                  </Button>
                ]}
              >
                <List.Item.Meta title={article.title} />
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane
          tab={`未通过（${userArticle.filter(article => article.status === 2).length}）`}
          key="4"
        >
          <List
            itemLayout="horizontal"
            dataSource={userArticle.filter(article => article.status === 2)}
            renderItem={article => (
              <List.Item
                actions={[
                  <a key="list-loadmore-edit">编辑</a>,
                  <Button type="text" danger key="list-delete">
                    删除
                  </Button>
                ]}
              >
                <List.Item.Meta title={article.title} />
              </List.Item>
            )}
          />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default ArticleControl
