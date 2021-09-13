/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { Spin } from 'antd'

const Loading = () => {
  return (
    <div
      css={css`
        width: 100%;
        height: 90vh;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <Spin
        size="large"
        className="title"
        css={css`
          color: skyblue;
          font-size: 50px;
        `}
      />
    </div>
  )
}

export default Loading
