import React, { Suspense, lazy, useState } from 'react'
import { Modal as AntdModal } from 'antd'
import PropTypes from 'prop-types'

const Login = lazy(() => import('../Login/Login'))
const Register = lazy(() => import('../Register/Register'))

const Modal = props => {
  const { modalVisible, showModal } = props
  const [modalTitle, setModalTitle] = useState('登录')

  const changeModalTitle = modalTitle => {
    return () => {
      setModalTitle(modalTitle)
    }
  }

  return (
    <AntdModal
      // forceRender={true}
      centered
      title={modalTitle}
      visible={modalVisible}
      maskClosable={false}
      destroyOnClose={true}
      footer={null}
      onCancel={showModal}
    >
      <Suspense fallback={<h2>网络较慢，加载中...</h2>}>
        {modalTitle === '登录' ? (
          <Login changeModalTitle={changeModalTitle} showModal={showModal} />
        ) : (
          <Register changeModalTitle={changeModalTitle} />
        )}
      </Suspense>
    </AntdModal>
  )
}

Modal.propTypes = {
  modalVisible: PropTypes.bool,
  showModal: PropTypes.func
}

export default Modal
