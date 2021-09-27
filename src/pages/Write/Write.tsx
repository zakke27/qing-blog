/** @jsxImportSource  @emotion/react */
import { css, jsx } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { Input, Button } from 'antd'

// custom hook  to change document tile
import useTitle from '../../hooks/useTitle'

const WriteContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -5.5rem;
  width: 1200px;
`
const Header = styled.header`
  padding: 0 27px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background-color: #ffffff;
`
const WriteArea = styled.div``

const Write: React.FC = () => {
  const [value, setValue] = useState<string | undefined>('')

  useTitle('写文章')

  const publishArticle = () => {
    console.log(value)
    // todo 🚧将blog推送到后端保存
  }

  return (
    <WriteContainer>
      <Header>
        <Input
          size="large"
          bordered={false}
          placeholder="输入文章标题..."
          css={css`
            font-size: 20px;
          `}
        />
        <Button type="primary" onClick={publishArticle} css={css``}>
          发布
        </Button>
      </Header>
      <WriteArea>
        <MDEditor height={640} value={value} onChange={setValue} />
      </WriteArea>
    </WriteContainer>
  )
}

export default Write
