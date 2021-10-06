import React from 'react'
import { Tabs, List, Button, Popconfirm } from 'antd'
import { Article } from '../../types/interfaces'
import { Link } from 'react-router-dom'

const { TabPane } = Tabs

interface Props {
  userArticleList: []
  deleteUserArticle: (articleid: number) => any // HACK bad
}

const UserArticleControl: React.FC<Props> = ({ userArticleList, deleteUserArticle }) => {
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
                  <Link
                    key="list-loadmore-edit"
                    to={{
                      pathname: '/user/write',
                      state: { article }
                    }}
                  >
                    编辑
                  </Link>,
                  <Popconfirm
                    title="确定删除吗？此操作不可逆！"
                    onConfirm={deleteUserArticle(article.articleid)}
                    okText="Yes"
                    cancelText="No"
                    key="list-delete"
                  >
                    <Button type="text" danger>
                      删除
                    </Button>
                  </Popconfirm>
                ]}
              >
                <List.Item.Meta title={article.articletitle} />
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane
          tab={`审核中（${
            userArticleList?.filter((article: Article) => article.articlestatus === 0)
              .length ?? 0
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
                  <Link
                    key="list-loadmore-edit"
                    to={{
                      pathname: '/user/write',
                      state: { article }
                    }}
                  >
                    编辑
                  </Link>,
                  <Popconfirm
                    title="确定删除吗？此操作不可逆！"
                    onConfirm={deleteUserArticle(article.articleid)}
                    okText="Yes"
                    cancelText="No"
                    key="list-delete"
                  >
                    <Button type="text" danger>
                      删除
                    </Button>
                  </Popconfirm>
                ]}
              >
                <List.Item.Meta title={article.articletitle} />
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane
          tab={`已通过（${
            userArticleList?.filter((article: Article) => article.articlestatus === 1)
              .length ?? 0
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
                  <Link
                    key="list-loadmore-edit"
                    to={{
                      pathname: '/user/write',
                      state: { article }
                    }}
                  >
                    编辑
                  </Link>,
                  <Popconfirm
                    title="确定删除吗？此操作不可逆！"
                    onConfirm={deleteUserArticle(article.articleid)}
                    okText="Yes"
                    cancelText="No"
                    key="list-delete"
                  >
                    <Button type="text" danger>
                      删除
                    </Button>
                  </Popconfirm>
                ]}
              >
                <List.Item.Meta title={article.articletitle} />
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane
          tab={`未通过（${
            userArticleList?.filter((article: Article) => article.articlestatus === 2)
              .length ?? 0
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
                  <Link
                    key="list-loadmore-edit"
                    to={{
                      pathname: '/user/write',
                      state: { article }
                    }}
                  >
                    编辑
                  </Link>,
                  <Popconfirm
                    title="确定删除吗？此操作不可逆！"
                    onConfirm={deleteUserArticle(article.articleid)}
                    okText="Yes"
                    cancelText="No"
                    key="list-delete"
                  >
                    <Button type="text" danger>
                      删除
                    </Button>
                  </Popconfirm>
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
