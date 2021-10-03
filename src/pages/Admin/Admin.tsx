/** @jsxImportSource  @emotion/react */
import { css, jsx } from '@emotion/react'
import React, { useState, useEffect } from 'react'
import { Switch, Route, Link, useLocation, useHistory } from 'react-router-dom'
import styled from '@emotion/styled'
import { Layout, Menu } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  HomeOutlined,
  ReadOutlined
} from '@ant-design/icons'
import AuthRoute from '../../routes/AuthRoute'
import AdminUserControl from '../../components/AdminUserControl/AdminUserControl'
import AdminArticleControl from '../../components/AdminArticleControl/AdminArticleControl'
import {
  getArticleAudit,
  getArticlePass,
  getArticleReject,
  getUserList
} from '../../api/admin'
import { User, Article } from '../../types/interfaces'

const { Header, Sider, Content } = Layout

const AdminContainer = styled(Layout)`
  margin-top: -4.6rem;
  /* background-color: lightblue; */
  min-width: 1440px;
`
const Sidebar = styled(Sider)`
  height: 90vh;
`

const LogoBox = styled.div`
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
`

const HeaderBox = styled(Header)`
  background: #fff;
  padding: 0;
`
const ContentBox = styled(Content)`
  padding: 20px 0 0 20px;
  /* background-color: gray; */
`

const ToggleBox = styled.div`
  width: 64px;
  height: 64px;
  padding: 0 24px;
  font-size: 18px;
  line-height: 64px;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #1890ff;
  }
`

const Admin: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  const [userList, setUserList] = useState<User[]>([])

  const [articleAuditList, setArticleAuditList] = useState<Article[]>([])
  const [articlePassList, setArticlePassList] = useState<Article[]>([])
  const [articleRejectList, setArticleRejectList] = useState<Article[]>([])

  // 请求全部用户列表
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserList()
        // 如果存在数据
        if (res.data[0]?.userid) {
          console.log(res)
          setUserList(res.data)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [userList])

  // 请求全部待审核文章列表
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res0 = await getArticleAudit()
        // 审核中
        if (res0.data[0]?.articleid) {
          console.log(res0)
          // setArticleAuditList(res0.data)
          setArticleAuditList(pre => ({ ...pre, ...res0.data }))
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res1 = await getArticlePass()
  //       // 已通过
  //       if (res1.data[0]?.articleid) {
  //         console.log(res1)
  //         setArticlePassList(res1.data)
  //       }
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   fetchData()
  // }, [])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res2 = await getArticleReject()
  //       // 已驳回
  //       if (res2.data[0]?.articleid) {
  //         console.log(res2)
  //         setArticleRejectList(res2.data)
  //       }
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   fetchData()
  // }, [])

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  return (
    <AdminContainer>
      <Sidebar trigger={null} collapsible collapsed={collapsed}>
        <LogoBox
          onClick={() => {
            history.push('/')
          }}
          css={css`
            cursor: pointer;
          `}
        />
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
          <Menu.Item key="/admin" icon={<HomeOutlined />}>
            <Link to="/admin">首页</Link>
          </Menu.Item>
          <Menu.Item key="/admin/user-control" icon={<UserOutlined />}>
            <Link to="/admin/user-control">用户管理</Link>
          </Menu.Item>
          <Menu.Item key="/admin/article-control" icon={<ReadOutlined />}>
            <Link to="/admin/article-control"> 文章管理</Link>
          </Menu.Item>
        </Menu>
      </Sidebar>
      <Layout>
        <HeaderBox>
          <ToggleBox onClick={toggle}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </ToggleBox>
        </HeaderBox>
        {/* 动态内容区 */}
        <ContentBox>
          <Switch>
            <AuthRoute exact path="/admin" roles={[0]}>
              <h2>管理员首页</h2>
            </AuthRoute>
            <AuthRoute path="/admin/user-control" roles={[0]}>
              <AdminUserControl userList={userList} />
            </AuthRoute>
            <AuthRoute path="/admin/article-control" roles={[0]}>
              <AdminArticleControl
                articleAuditList={articleAuditList}
                articlePassList={articlePassList}
                articleRejectList={articleRejectList}
              />
            </AuthRoute>
          </Switch>
        </ContentBox>
      </Layout>
    </AdminContainer>
  )
}

export default Admin
