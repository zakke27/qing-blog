import React, { useState } from 'react'
import { Modal as AntdModal } from 'antd'

import Login from '../../pages/login/Login'
import Register from '../../pages/register/Register'
import PropTypes from 'prop-types'

const LoginModal = ({ visible, showLoginModal }) => {
  const [isLoginModal, setIsLoginModal] = useState(true)
  return (
    <>
      <AntdModal
        className="login-modal"
        // transitionName=""
        // maskTransitionName=""
        centered
        title="登录"
        visible={visible}
        maskClosable={false}
        destroyOnClose={true}
        footer={null}
        onCancel={showLoginModal(false)}
      >
        {isLoginModal ? (
          <Login setIsLoginModal={setIsLoginModal} />
        ) : (
          <Register setIsLoginModal={setIsLoginModal} />
        )}
      </AntdModal>
    </>
  )
}

LoginModal.propTypes = {
  visible: PropTypes.bool,
  showLoginModal: PropTypes.func
}

export default LoginModal
