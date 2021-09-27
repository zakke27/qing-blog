import React from 'react'
import styled from '@emotion/styled'
import { Result, Button } from 'antd'
import { useHistory } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
`
const NotFound: React.FC = () => {
  let history = useHistory()

  const goBackHome = () => {
    history.replace('/')
  }

  return (
    <Container>
      <Result
        status="404"
        title="404"
        subTitle="对不起，你所访问的页面不存在 :/"
        extra={
          <Button type="primary" onClick={goBackHome}>
            返回首页
          </Button>
        }
      />
    </Container>
  )
}

export default NotFound
