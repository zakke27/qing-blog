/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { Result, Button } from 'antd'
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
      <Result
        status="404"
        title="404"
        subTitle="对不起，你所访问的页面不存在 : )"
        extra={
          <Button type="primary" onClick={goBackHome}>
            返回首页
          </Button>
        }
      />
    </div>
  )
}

export default NotFound
