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

/* const articleAuditList = [
  {
    articleid: 3, // 文章id
    userid: 13, // 所属用户id
    articletitle: 'Java基础一', // 文章标题
    articlebody: '## Java基础篇（一）', // 文章内容
    articletag: 'Java', // 文章标签
    articlestatus: 0, // 文章状态，0代表审核中，1代表通过，2代表被驳回
    articlehot: 0, // 文章热度
    username: 'yujinguo007' // 文章所属用户用户名
  },
  {
    articleid: 4, // 文章id
    userid: 15, // 所属用户id
    articletitle: '浏览器工作原理', // 文章标题
    articlebody:
      '![](##) 浏览器的主要功能\n\n浏览器的主要功能就是向服务器发送请求，在浏览器窗口中展示你选择的网络资源。这里说的资源一般是指 HTML 文档，也可以是 PDF 、图片或其他类型。资源的位置由用户使用 URI（统一资源标识符）指定。\n\n简单来说，浏览器就是把从服务器端请求来的资源以某种形式展示在浏览器页面中，以供用户浏览。\n\n浏览器的用户界面大都有如下元素：\n\n- 用来输入 URI ![](的地址栏)\n- 前进和后退按钮（一般采用了栈结构）\n- 书签设置选项\n- 刷新和停止加载当前文档的按钮\n- 用于返回主页的按钮\n\n## 浏览器的高层结构\n\n浏览器的主要组件为：\n\n1. 用户界面：包括地址栏、前进/后退按钮、书签菜单等。除了浏览器主窗口显示的你请求的页面外，其他显示的各个部分都属于用户界面。\n2. 浏览器引擎：在用户界面和呈现引擎之间传送指令。\n3. 呈现引擎：负责显示请求的内容。如果请求的内容是 HTML，它就负责解析 HTML 和 CSS 内容，并将解析后的内容显示在屏幕上。\n4. 网络：用于网络调用，比如 HTTP 请求。其接口与平台无关，并为所有平台提供底层实现。\n5. 用户界面后端：用于绘制基本的窗口小部件，比如组合框和窗口。其公开了与平台无关的通用接口，而在底层使用操作系统的用户界面方法。\n6. JavaScript 解释器：用于解析和执行 JavaScript 代码。\n7. 数据存储：这是持久层。浏览器需要在硬盘上保存各种数据，例如 Cookie。新的 HTML 规范（HTML5）定义了“网络数据库”，这是一个完整但是轻便的浏览器内数据库。\n', // 文章内容
    articletag: null, // 文章标签
    articlestatus: 0, // 文章状态，0代表审核中，1代表通过，2代表被驳回
    articlehot: 0, // 文章热度
    username: 'zakke' // 文章所属用户用户名
  },
  {
    articleid: 5, // 文章id
    userid: 15, // 所属用户id
    articletitle: 'Test222', // 文章标题
    articlebody:
      '![](##) 浏览器的主要功能\n\n浏览器的主要功能就是向服务器发送请求，在浏览器窗口中展示你选择的网络资源。这里说的资源一般是指 HTML 文档，也可以是 PDF 、图片或其他类型。资源的位置由用户使用 URI（统一资源标识符）指定。\n\n简单来说，浏览器就是把从服务器端请求来的资源以某种形式展示在浏览器页面中，以供用户浏览。\n\n浏览器的用户界面大都有如下元素：\n\n- 用来输入 URI ![](的地址栏)\n- 前进和后退按钮（一般采用了栈结构）\n- 书签设置选项\n- 刷新和停止加载当前文档的按钮\n- 用于返回主页的按钮\n\n## 浏览器的高层结构\n\n浏览器的主要组件为：\n\n1. 用户界面：包括地址栏、前进/后退按钮、书签菜单等。除了浏览器主窗口显示的你请求的页面外，其他显示的各个部分都属于用户界面。\n2. 浏览器引擎：在用户界面和呈现引擎之间传送指令。\n3. 呈现引擎：负责显示请求的内容。如果请求的内容是 HTML，它就负责解析 HTML 和 CSS 内容，并将解析后的内容显示在屏幕上。\n4. 网络：用于网络调用，比如 HTTP 请求。其接口与平台无关，并为所有平台提供底层实现。\n5. 用户界面后端：用于绘制基本的窗口小部件，比如组合框和窗口。其公开了与平台无关的通用接口，而在底层使用操作系统的用户界面方法。\n6. JavaScript 解释器：用于解析和执行 JavaScript 代码。\n7. 数据存储：这是持久层。浏览器需要在硬盘上保存各种数据，例如 Cookie。新的 HTML 规范（HTML5）定义了“网络数据库”，这是一个完整但是轻便的浏览器内数据库。\n', // 文章内容
    articletag: null, // 文章标签
    articlestatus: 0, // 文章状态，0代表审核中，1代表通过，2代表被驳回
    articlehot: 0, // 文章热度
    username: 'zakke' // 文章所属用户用户名
  },
  {
    articleid: 6, // 文章id
    userid: 15, // 所属用户id
    articletitle: 'Test3333', // 文章标题
    articlebody:
      '![](##) 浏览器的主要功能\n\n浏览器的主要功能就是向服务器发送请求，在浏览器窗口中展示你选择的网络资源。这里说的资源一般是指 HTML 文档，也可以是 PDF 、图片或其他类型。资源的位置由用户使用 URI（统一资源标识符）指定。\n\n简单来说，浏览器就是把从服务器端请求来的资源以某种形式展示在浏览器页面中，以供用户浏览。\n\n浏览器的用户界面大都有如下元素：\n\n- 用来输入 URI ![](的地址栏)\n- 前进和后退按钮（一般采用了栈结构）\n- 书签设置选项\n- 刷新和停止加载当前文档的按钮\n- 用于返回主页的按钮\n\n## 浏览器的高层结构\n\n浏览器的主要组件为：\n\n1. 用户界面：包括地址栏、前进/后退按钮、书签菜单等。除了浏览器主窗口显示的你请求的页面外，其他显示的各个部分都属于用户界面。\n2. 浏览器引擎：在用户界面和呈现引擎之间传送指令。\n3. 呈现引擎：负责显示请求的内容。如果请求的内容是 HTML，它就负责解析 HTML 和 CSS 内容，并将解析后的内容显示在屏幕上。\n4. 网络：用于网络调用，比如 HTTP 请求。其接口与平台无关，并为所有平台提供底层实现。\n5. 用户界面后端：用于绘制基本的窗口小部件，比如组合框和窗口。其公开了与平台无关的通用接口，而在底层使用操作系统的用户界面方法。\n6. JavaScript 解释器：用于解析和执行 JavaScript 代码。\n7. 数据存储：这是持久层。浏览器需要在硬盘上保存各种数据，例如 Cookie。新的 HTML 规范（HTML5）定义了“网络数据库”，这是一个完整但是轻便的浏览器内数据库。\n', // 文章内容
    articletag: null, // 文章标签
    articlestatus: 0, // 文章状态，0代表审核中，1代表通过，2代表被驳回
    articlehot: 0, // 文章热度
    username: 'zakke' // 文章所属用户用户名
  },
  {
    articleid: 7, // 文章id
    userid: 15, // 所属用户id
    articletitle: 'test444', // 文章标题
    articlebody: 'dadaf\nfafaf\n\n\nfafafa\n\n\n\nfafaafa', // 文章内容
    articletag: null, // 文章标签
    articlestatus: 0, // 文章状态，0代表审核中，1代表通过，2代表被驳回
    articlehot: 0, // 文章热度
    username: 'zakke' // 文章所属用户用户名
  }
]

const articlePassList = [
  {
    articleid: 1, // 文章id
    userid: 2, // 所属用户id
    articletitle: 'Java', // 文章标题
    articlebody: '这是Java基础', // 文章内容
    articletag: null, // 文章标签，可为空
    articlestatus: 1, // 文章状态，0代表审核中，1代表
    articlehot: 0, // 文章热度
    username: 'zhaotong' // 文章所属用户用户名
  }
]
const articleRejectList = [
  {
    articleid: 1, // 文章id
    userid: 2, // 所属用户id
    articletitle: 'Java', // 文章标题
    articlebody: '这是Java基础', // 文章内容
    articletag: null, // 文章标题
    articlestatus: 2, // 文章状态，0代表审核中，1代表审核通过，2代表被驳回
    articlehot: 0, // 文章热度
    username: 'zhaotong' // 文章所属用户用户名
  }
]
 */
const AdminArticleControl: React.FC<Props> = ({
  articleAuditList,
  articlePassList,
  articleRejectList,
  fetchArticleList
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [article, setArticle] = useState<Article>()

  // 通过文章
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
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div>
      <Modal
        title="审核文章"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        style={{ top: 50 }}
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
            <Column
              title="操作"
              key="action"
              render={(text, record: any) => (
                <Space size="middle">
                  <Button size="small" type="primary" onClick={adminPassArticle(record)}>
                    通过文章
                  </Button>
                  <Button
                    size="small"
                    type="primary"
                    danger
                    onClick={adminRejectArticle(record)}
                  >
                    驳回文章
                  </Button>
                </Space>
              )}
            />
          </Table>
        </TabPane>
        <TabPane tab={`已通过（${articlePassList?.length}）`} key="2">
          <Table dataSource={articlePassList} rowKey="articleid">
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
          <Table dataSource={articleRejectList} rowKey="articleid">
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
