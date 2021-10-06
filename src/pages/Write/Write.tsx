/** @jsxImportSource  @emotion/react */
import { css, jsx } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { Input, Button, message } from 'antd'

// custom hook  to change document tile
import useTitle from '../../hooks/useTitle'
import { addArticle, updateArticle } from '../../api/article'
import { ArticleDetail, NewArticleParams, UpdateArticleParams } from '../../types/interfaces'
import { getUser } from '../../utils/Auth'
import { useLocation, useHistory } from 'react-router-dom'

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

interface stateType {
  article: ArticleDetail
  from: { pathname: string }
}

const Write: React.FC = () => {
  const history = useHistory()
  const { state } = useLocation<stateType>()

  // console.log(state)
  const [articleTitle, setArticleTitle] = useState<string>()
  const [articleContent, setArticleContent] = useState<string | undefined>()

  useTitle('写文章')

  useEffect(() => {
    if (state?.article) {
      setArticleTitle(state?.article.articletitle)
      setArticleContent(state?.article.articlebody)
    }
  }, [state?.article])

  const handleArticleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArticleTitle(event.target.value)
  }

  const publishArticle = async () => {
    if (!articleContent || !articleTitle || articleTitle?.trim() === '') {
      message.warn('文章标题或内容不可为空', 2)
      return
    }

    const temp: NewArticleParams = {
      userid: getUser()?.userid,
      username: getUser()?.username,
      articletitle: articleTitle,
      articlebody: articleContent,
      articlestatus: 0
    }

    try {
      const res = await addArticle(temp)
      if (res.data.code === 7001) {
        console.log(res)
        message.success('文章上传成功，审核中', 2)
        setTimeout(() => {
          history.replace('/')
        }, 2000)
      }
    } catch (error) {
      console.error(error)
    }
  }

  // 更新文章
  const updateUserArticle = async () => {
    if (!articleContent || !articleTitle || articleTitle?.trim() === '') {
      message.warn('文章标题或内容不可为空', 2)
      return
    }

    const updateTemp: UpdateArticleParams = {
      articleid: state?.article.articleid,
      articletitle: articleTitle,
      articlebody: articleContent,
      articletag: ''
    }

    try {
      const res = await updateArticle(updateTemp)
      if (res?.data.code === 111) {
        console.log(res)
        message.success('文章修改成功，请耐心等待文章审核!', 2)

        setTimeout(() => {
          history.replace('/')
        }, 2000)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <WriteContainer>
      <Header>
        <Input
          required
          size="large"
          bordered={false}
          placeholder="输入文章标题..."
          value={articleTitle}
          onChange={handleArticleTitle}
          maxLength={40}
          css={css`
            font-size: 20px;
          `}
        />
        {state?.article ? (
          <Button type="primary" onClick={updateUserArticle} css={css``}>
            更新
          </Button>
        ) : (
          <Button type="primary" onClick={publishArticle} css={css``}>
            发布
          </Button>
        )}
      </Header>
      <WriteArea>
        <MDEditor height={640} value={articleContent} onChange={setArticleContent} />
      </WriteArea>
    </WriteContainer>
  )
}

export default Write
