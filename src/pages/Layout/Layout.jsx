/** @jsx jsx **/
import { css, jsx } from '@emotion/react'
import { Suspense, lazy, useState } from 'react'
import { Route, Switch } from 'react-router-dom'

import { Layout as AntdLayout, BackTop } from 'antd'
import { ToTopOutlined } from '@ant-design/icons'

import Loading from '../../components/Loading/Loading'

const NavBar = lazy(() => import('../../components/NavBar/NavBar'))
// const Content = lazy(() => import('../../components/Content/Content'))
const Modal = lazy(() => import('../../components/Modal/Modal'))
const Home = lazy(() => import('../../components/Home/Home'))
const Hot = lazy(() => import('../../components/Hot/Hot'))
const History = lazy(() => import('../../components/History/History'))
const Blog = lazy(() => import('../../components/Blog/Blog'))
const Admin = lazy(() => import('../Admin/Admin'))
const NotFound = lazy(() => import('../../components/404/NotFound'))

const Layout = () => {
  const [modalVisible, setModalVisible] = useState(false)

  //是否展示Modal
  const showModal = () => {
    setModalVisible(!modalVisible)
  }

  return (
    <Suspense fallback={<Loading />}>
      <AntdLayout
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <NavBar showModal={showModal} />
        <div
          css={css`
            margin-top: 6rem;
            /* background-color: white; */
            min-width: 960px;
            height: 100vh;
            font-size: 16px;
          `}
        >
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
              <Route path="/post/:id">
                <Blog />
              </Route>
              <Route path="/admin">
                <Admin />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </Suspense>
        </div>
        <Modal modalVisible={modalVisible} showModal={showModal} />
        <BackTop>
          <div
            css={css`
              width: 40px;
              height: 40px;
              line-height: 40px;
              color: #fff;
              background-color: #1088e9;
              text-align: center;
              border-radius: 4px;
              font-size: 27px;
            `}
          >
            <ToTopOutlined />
          </div>
        </BackTop>
      </AntdLayout>
    </Suspense>
  )
}

export default Layout
