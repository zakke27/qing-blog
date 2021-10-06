/** @jsxImportSource  @emotion/react */
import { css, jsx } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { Tabs, List, Button, Table, Space, message, Tag, Modal } from 'antd'
import {
  auditArticle,
  getArticleAudit,
  getArticlePass,
  getArticleReject,
  passArticle,
  rejectArticle
} from '../../api/admin'
import { Article } from '../../types/interfaces'
import MDEditor from '@uiw/react-md-editor'

const { TabPane } = Tabs
const { Column } = Table

interface Props {
  articleAuditList: Article[]
  articlePassList: Article[]
  articleRejectList: Article[]
  fetchArticleList: () => void
}

const AdminArticleControl: React.FC<Props> = ({
  articleAuditList,
  articlePassList,
  articleRejectList,
  fetchArticleList
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [article, setArticle] = useState<Article>()

  // 改为审核文章
  const adminAuditArticle = (record: Article) => {
    return async () => {
      try {
        const res = await auditArticle(record.articleid)
        if (res.data?.code === 1001) {
          console.log(res)
          fetchArticleList()
          message.success('操作成功，文章改完待审核', 2)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
  // 通过文章
  const adminPassArticle = (record: Article) => {
    return async () => {
      try {
        const res = await passArticle(record.articleid)
        if (res.data?.code === 1003) {
          console.log(res)
          fetchArticleList()
          message.success('操作成功，文章已通过', 2)
          setIsModalVisible(false)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
  // 驳回文章
  const adminRejectArticle = (record: Article) => {
    return async () => {
      try {
        const res = await rejectArticle(record.articleid)
        if (res.data?.code === 1005) {
          console.log(res)
          fetchArticleList()
          message.success('操作成功，文章已驳回', 2)
          setIsModalVisible(false)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div>
      <Modal
        title="审核文章"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={1000}
        style={{ top: 50 }}
        footer={[
          <Button
            key="pass"
            size="small"
            type="primary"
            onClick={adminPassArticle(article as Article)}
          >
            通过文章
          </Button>,
          <Button
            key="reject"
            size="small"
            type="primary"
            danger
            onClick={adminRejectArticle(article as Article)}
          >
            驳回文章
          </Button>
        ]}
      >
        <div>
          <h2>{article?.articletitle}</h2>
          <MDEditor.Markdown source={article?.articlebody} />
        </div>
      </Modal>
      <Tabs type="card" tabBarGutter={27}>
        <TabPane tab={`待审核（${articleAuditList?.length}）`} key="1">
          <Table
            dataSource={articleAuditList}
            rowKey="articleid"
            pagination={{
              pageSize: 7
            }}
            onRow={(record: any) => {
              return {
                onClick: event => {
                  console.log(record)
                  setArticle(record)
                  setIsModalVisible(true)
                }
              }
            }}
          >
            <Column title="文章id" dataIndex="articleid" key="articleid" />
            <Column title="用户名" dataIndex="username" key="username" />
            <Column title="文章标题" dataIndex="articletitle" key="articletitle" />
            <Column
              title="文章状态"
              dataIndex="articlestatus"
              key="articlestatus"
              render={articlestatus => (
                <Tag color="blue" key="articlestatus">
                  待审核
                </Tag>
              )}
            />
          </Table>
        </TabPane>
        <TabPane tab={`已通过（${articlePassList?.length}）`} key="2">
          <Table
            dataSource={articlePassList}
            rowKey="articleid"
            pagination={{
              pageSize: 7
            }}
          >
            <Column title="文章id" dataIndex="articleid" key="articleid" />
            <Column title="用户名" dataIndex="username" key="username" />
            <Column title="文章标题" dataIndex="articletitle" key="articletitle" />
            <Column
              title="文章状态"
              dataIndex="articlestatus"
              key="articlestatus"
              render={articlestatus => (
                <Tag color="blue" key="articlestatus">
                  待审核
                </Tag>
              )}
            />
            <Column
              title="操作"
              key="action"
              render={(text, record: any) => (
                <Space size="middle">
                  <Button size="small" type="primary" onClick={adminAuditArticle(record)}>
                    改为待审核
                  </Button>
                </Space>
              )}
            />
          </Table>
        </TabPane>
        <TabPane tab={`已驳回（${articleRejectList?.length}）`} key="3">
          <Table
            dataSource={articleRejectList}
            rowKey="articleid"
            pagination={{
              pageSize: 7
            }}
          >
            <Column title="文章id" dataIndex="articleid" key="articleid" />
            <Column title="用户名" dataIndex="username" key="username" />
            <Column title="文章标题" dataIndex="articletitle" key="articletitle" />
            <Column
              title="文章状态"
              dataIndex="articlestatus"
              key="articlestatus"
              render={articlestatus => (
                <Tag color="blue" key="articlestatus">
                  已驳回
                </Tag>
              )}
            />
            <Column
              title="操作"
              key="action"
              render={(text, record: any) => (
                <Space size="middle">
                  <Button size="small" type="primary" onClick={adminAuditArticle(record)}>
                    改为待审核
                  </Button>
                </Space>
              )}
            />
          </Table>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default AdminArticleControl
