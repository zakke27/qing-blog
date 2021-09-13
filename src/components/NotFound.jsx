/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { Button } from 'antd'
import { useHistory } from 'react-router-dom'

const NotFound = () => {
  let history = useHistory()
  const goBackHome = () => {
    history.replace('/')
  }
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-content: center;
        text-align: center;
      `}
    >
      <div>
        <h1
          css={css`
            margin-top: 14rem;
            font-size: 50px;
            color: #1890ff;
          `}
        >
          404
        </h1>
        <Button
          size="large"
          type="default"
          onClick={goBackHome}
          css={css`
            color: #1890ff;
            border-color: #1890ff;
          `}
        >
          回到首页
        </Button>
      </div>
    </div>
  )
}

export default NotFound
