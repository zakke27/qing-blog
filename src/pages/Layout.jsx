/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { Suspense, lazy, useState } from 'react'
import { Layout as AntdLayout, BackTop } from 'antd'
import { ToTopOutlined } from '@ant-design/icons'
// import NavBar from '../components/NavBar'
// import Content from '../components/Content'
// import Modal from '../components/Modal'
import Loading from '../components/Loading'

const NavBar = lazy(() => import('../components/NavBar'))
const Content = lazy(() => import('../components/Content'))
const Modal = lazy(() => import('../components/Modal'))

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
        <Content />
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
