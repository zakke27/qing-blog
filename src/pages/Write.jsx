/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { Input, Button } from 'antd'

// custom hook   change page title
import useTitle from '../hooks/useTitle'

const Write = () => {
  const [value, setValue] = useState('**Hello World!**')

  useTitle('写文章')

  const publishBlog = () => {
    console.log(value)
    //todo 🚧将blog推送到后端保存
  }
  return (
    <div
      className="container"
      css={css`
        display: flex;
        flex-direction: column;
        /* border-top: 2px solid #1890ff; */
      `}
    >
      <header
        css={css`
          padding: 0 27px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 60px;
          background-color: #ffffff;
        `}
      >
        <Input
          size="large"
          bordered={false}
          placeholder="输入文章标题..."
          css={css`
            font-size: 20px;
          `}
        />
        <Button type="primary" onClick={publishBlog} css={css``}>
          发布
        </Button>
      </header>
      <main css={css``}>
        <MDEditor height={800} value={value} onChange={setValue} css={css``} />
        {/* <MDEditor.Markdown source={value} /> */}
      </main>
    </div>
  )
}

export default Write
