/** @jsxImportSource  @emotion/react */
import { css, jsx } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MDEditor from '@uiw/react-md-editor'
import {
  cancelArticleLike,
  getArticleDetailById,
  saveArticleLike
} from '../../api/article'
import { getUserLikedById } from '../../api/user'
import { getToken, getUser } from '../../utils/Auth'
import { Divider } from 'antd'
import {
  LikeFilled,
  LikeOutlined,
  CommentOutlined,
  WarningOutlined
} from '@ant-design/icons'

const ArticleContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: lightgreen;
  width: 960px;
  /* height: 800px; */
`

const Toolbar = styled.div`
  position: fixed;
  /* background-color: #ffffff; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 5rem;
  margin-left: -6rem;
  height: 140px;
`
const Content = styled.article`
  flex: 3;
  background: #ffffff;
  margin-right: 1.5rem;
  padding: 10px;
`
const Aside = styled.aside`
  flex: 1;
  background-color: #ffffff;
  height: 80vh;
`
const IconDiv = styled.div`
  margin-right: 0.75rem;
  width: 36px;
  height: 36px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 16px;
  border: 1px solid silver;
  cursor: pointer;
  :hover {
    color: #1890ff;
    border-color: #1890ff;
  }
`

interface RouteParams {
  id: string
}

interface ArticleDetail {
  id?: number
  author: string
  avatar: string
  title: string
  content: string
  likeCount: number | 0
  comments: {
    id: number
    author: string
    content: string
    replyDate: string
  }[]
}

interface Props {
  showModal: () => void
}

const Article: React.FC<Props> = ({ showModal }) => {
  const { id: articleId } = useParams<RouteParams>()
  const [articleDetail, setArticleDetail] = useState<ArticleDetail | null>(null)
  const [isLiked, setIsLiked] = useState<boolean>(false)

  useEffect(() => {
    // 根据文章id请求文章详细信息
    getArticleDetailById(articleId)
      .then(res => {
        console.log('getArticleDetailById', res)
        if (res.data.code === 200) {
          setArticleDetail(res.data.data)
        }
      })
      .catch(err => {
        console.log(err)
      })
    // 根据用户id请求用户点赞过的文章列表
    if (getToken()) {
      getUserLikedById(getUser().id)
        .then(res => {
          // console.log('getUserLikedById', res)
          if (res.data.code === 200) {
            const temp: boolean = res.data.data.includes(parseInt(articleId, 10))
            setIsLiked(temp)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [articleId])

  // 点赞与取消点赞
  const likeArticle = async () => {
    // FIXME
    if (getToken() && articleDetail) {
      if (!isLiked) {
        // 点赞
        const res = await saveArticleLike(articleId, String(getUser().id)).catch(
          err => console.log(err)
        )
        if (res?.data.code === 200) {
          console.log(res)
          setIsLiked(true)
        }
        // setArticleDetail({
        //   ...articleDetail,
        //   likeCount: articleDetail?.likeCount + 1
        // })
      } else {
        // 取消点赞
        const res = await cancelArticleLike(articleId, String(getUser().id))
        if (res.data.code === 200) {
          console.log(res)
          setIsLiked(false)
        }
        // setIsLiked(false)
        // setArticleDetail({
        //   ...articleDetail,
        //   likeCount: articleDetail?.likeCount - 1
        // })
      }
    } else {
      // 未登录则弹出登录框
      showModal()
    }
  }

  // 锚点跳转
  const scrollToAnchor = (anchorName: string) => {
    if (anchorName) {
      const anchorElement = document.getElementById(anchorName)
      if (anchorElement) {
        anchorElement.scrollIntoView({ block: 'center' })
      }
    }
  }

  return (
    <ArticleContainer>
      <Toolbar>
        <div
          className="liked"
          onClick={likeArticle}
          css={css`
            display: flex;
            align-items: center;
            color: ${isLiked && '#1890ff'};
            cursor: pointer;
          `}
        >
          <IconDiv
            css={css`
              border-color: ${isLiked && '#1890ff'};
            `}
          >
            {isLiked ? <LikeFilled /> : <LikeOutlined />}
          </IconDiv>
          <div>{articleDetail?.likeCount}</div>
        </div>
        <div
          className="comment"
          onClick={() => scrollToAnchor('comment')}
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <IconDiv>
            <CommentOutlined />
          </IconDiv>
          <div>{articleDetail?.comments.length}</div>
        </div>
        <div className="report">
          <IconDiv>
            <WarningOutlined />
          </IconDiv>
        </div>
      </Toolbar>
      <Content>
        {!!articleDetail && (
          <div>
            <h1>{articleDetail.title}</h1>
            <div>作者：{articleDetail.author}</div>
            <br />
            <MDEditor.Markdown source={articleDetail.content} />
            <br />
          </div>
        )}
        <Divider />
        <div>
          <h3 id="comment">全部评论 （{articleDetail?.comments.length}）</h3>
        </div>
      </Content>
      <Aside>施工中🚧</Aside>
    </ArticleContainer>
  )
}

export default Article
