import React, { useState, useEffect } from 'react'
import { Tabs, List, Button } from 'antd'

const { TabPane } = Tabs

interface Props {
  userArticleList: [] | undefined
}

interface Article {
  id: number
  title: string
  content: string
  status: number
}

const ArticleControl: React.FC<Props> = ({ userArticleList }) => {
  return (
    <div>
      <Tabs>
        <TabPane tab={`全部（${userArticleList?.length}）`} key="1">
          <List
            itemLayout="horizontal"
            dataSource={userArticleList}
            renderItem={(article: Article) => (
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
          tab={`审核中（${
            userArticleList?.filter((article: Article) => article.status === 0)
              .length
          }）`}
          key="2"
        >
          <List
            itemLayout="horizontal"
            dataSource={userArticleList?.filter(
              (article: Article) => article.status === 0
            )}
            renderItem={(article: Article) => (
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
          tab={`已通过（${
            userArticleList?.filter((article: Article) => article.status === 1)
              .length
          }）`}
          key="3"
        >
          <List
            itemLayout="horizontal"
            dataSource={userArticleList?.filter(
              (article: Article) => article.status === 1
            )}
            renderItem={(article: Article) => (
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
          tab={`未通过（${
            userArticleList?.filter((article: Article) => article.status === 2)
              .length
          }）`}
          key="4"
        >
          <List
            itemLayout="horizontal"
            dataSource={userArticleList?.filter(
              (article: Article) => article.status === 2
            )}
            renderItem={(article: Article) => (
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
