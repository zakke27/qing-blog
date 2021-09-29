import React from 'react'
import { Tabs, List, Button } from 'antd'
import { Article } from '../../types/interfaces'

const { TabPane } = Tabs

interface Props {
  userArticleList: []
  deleteUserArticle: (articleid: number) => any // HACK bad
}

const UserArticleControl: React.FC<Props> = ({
  userArticleList,
  deleteUserArticle
}) => {
  console.log(userArticleList)

  return (
    <div>
      <Tabs>
        <TabPane tab={`全部（${userArticleList?.length ?? 0}）`} key="1">
          <List
            itemLayout="horizontal"
            dataSource={userArticleList}
            renderItem={(article: Article) => (
              <List.Item
                actions={[
                  <a key="list-loadmore-edit">编辑</a>,
                  <Button
                    type="text"
                    danger
                    key="list-delete"
                    onClick={deleteUserArticle(article.articleid)}
                  >
                    删除
                  </Button>
                ]}
              >
                <List.Item.Meta title={article.articletitle} />
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane
          tab={`审核中（${
            userArticleList?.filter(
              (article: Article) => article.articlestatus === 0
            ).length ?? 0
          }）`}
          key="2"
        >
          <List
            itemLayout="horizontal"
            dataSource={userArticleList?.filter(
              (article: Article) => article.articlestatus === 0
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
                <List.Item.Meta title={article.articletitle} />
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane
          tab={`已通过（${
            userArticleList?.filter(
              (article: Article) => article.articlestatus === 1
            ).length ?? 0
          }）`}
          key="3"
        >
          <List
            itemLayout="horizontal"
            dataSource={userArticleList?.filter(
              (article: Article) => article.articlestatus === 1
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
                <List.Item.Meta title={article.articletitle} />
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane
          tab={`未通过（${
            userArticleList?.filter(
              (article: Article) => article.articlestatus === 2
            ).length ?? 0
          }）`}
          key="4"
        >
          <List
            itemLayout="horizontal"
            dataSource={userArticleList?.filter(
              (article: Article) => article.articlestatus === 2
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
                <List.Item.Meta title={article.articletitle} />
              </List.Item>
            )}
          />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default UserArticleControl
