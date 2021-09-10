import React, { Suspense, lazy, useState } from 'react'
import './Layout.scss'
import { Layout as AntdLayout } from 'antd'
import { Route, Switch } from 'react-router-dom'
import NavBar from '../navbar/NavBar'
import Home from '../../pages/home/Home'
import Loading from '../loading/Loading'

// lazy 懒加载
const Hot = lazy(() => import('../../pages/hot/Hot'))
const History = lazy(() => import('../../pages/history/History'))
const NotFound = lazy(() => import('../../pages/404/NotFound'))
const LoginModal = lazy(() => import('../modal/Modal'))

const Layout = () => {
  const { Content } = AntdLayout
  const [visible, setVisible] = useState(false)
  /**
   * 展示登录模态框方法
   * @param {boolean} bool -是否展示modal
   * @returns
   */
  const showLoginModal = bool => {
    return () => {
      setVisible(bool)
    }
  }
  showLoginModal()
  return (
    <AntdLayout>
      <NavBar showLoginModal={showLoginModal} />
      <Content className="content">
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/hot">
              <Hot />
            </Route>
            <Route path="/history">
              <History />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </Content>
      <LoginModal visible={visible} showLoginModal={showLoginModal} />
    </AntdLayout>
  )
}

export default Layout
