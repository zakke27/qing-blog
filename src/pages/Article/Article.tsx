/** @jsxImportSource  @emotion/react */
import { css, jsx } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import MDEditor from '@uiw/react-md-editor'
import {
  cancelArticleLike,
  getArticleDetail,
  getCommentList,
  saveArticleLike
} from '../../api/article'
import { addComment, getUserLiked } from '../../api/user'
import { getUser } from '../../utils/Auth'
import {
  Divider,
  List,
  Comment as AntdComment,
  Avatar,
  Form,
  Input,
  Button,
  message
} from 'antd'
import { LikeFilled, LikeOutlined, CommentOutlined, WarningOutlined } from '@ant-design/icons'
import { ArticleDetail, Comment, NewComment } from '../../types/interfaces'
import useScrollToTop from '../../hooks/useScrollToTop'

const ArticleContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* background-color: lightgreen; */
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

interface Props {
  showModal: () => void
}

const Article: React.FC<Props> = ({ showModal }) => {
  const { id } = useParams<RouteParams>()
  const articleId = parseInt(id, 10)
  const [articleDetail, setArticleDetail] = useState<ArticleDetail | null>(null)
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [commentList, setCommentList] = useState<Comment[]>([])
  const [commentValue, setCommentValue] = useState('')

  useScrollToTop()

  // 根据文章id请求文章详细信息
  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        const res = await getArticleDetail(articleId)
        if (res) {
          console.log(res)
          setArticleDetail(res.data)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchArticleDetail()
    // 根据用户id请求用户点赞过的文章列表
    // if (getUser()) {
    //   getUserLiked(getUser().userid)
    //     .then(res => {
    //       // console.log('getUserLikedById', res)
    //       if (res.data.code === 200) {
    //         const temp: boolean = res.data.data.includes(articleId)
    //         setIsLiked(temp)
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // }
  }, [articleId])

  const fetchCommentList = useCallback(async () => {
    try {
      const res = await getCommentList(articleId)
      if (res?.data) {
        console.log(res)
        setCommentList(res.data)
      }
    } catch (error) {}
  }, [articleId])

  useEffect(() => {
    fetchCommentList() // 根据文章id请求文章评论列表
  }, [fetchCommentList])

  // 点赞与取消点赞
  const likeArticle = async () => {
    // FIXME
    if (getUser() && articleDetail) {
      if (!isLiked) {
        // 点赞
        const res = await saveArticleLike(articleId, getUser().userid).catch(err =>
          console.log(err)
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
        const res = await cancelArticleLike(articleId, getUser().userid)
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

  // 发表评论
  const publishComment = async () => {
    if (!getUser()?.userid) {
      showModal()
    }
    // console.log({ commentValue })
    const newComment: NewComment = {
      userid: getUser()?.userid,
      username: getUser()?.username,
      articleid: articleId,
      commentbody: commentValue
    }
    console.log({ newComment })
    try {
      const res = await addComment(newComment)
      if (res.data.code === 3001) {
        console.log(res)
        fetchCommentList()
        message.success('评论成功', 2)
      }
      if (res.data.code === 3002) {
        message.error('评论失败', 2)
      }
    } catch (error) {
      console.error(error)
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
          {/* <div>{articleDetail?.likeCount}</div> */}
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
          <div>{commentList?.length}</div>
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
            <h1>{articleDetail.articletitle}</h1>
            {!(getUser()?.userid === articleDetail?.userid) && (
              <Button
                css={css`
                  float: right;
                `}
              >
                关注
              </Button>
            )}
            <div>作者：{articleDetail.username}</div>
            <br />
            <MDEditor.Markdown source={articleDetail.articlebody} />
            <br />
          </div>
        )}
        <div>
          <AntdComment
            avatar={
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
              />
            }
            content={
              <>
                <Form.Item>
                  <Input.TextArea
                    rows={4}
                    placeholder="输入评论（Enter换行）"
                    onChange={e => setCommentValue(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  css={css`
                    float: right;
                  `}
                >
                  <Button htmlType="submit" type="primary" onClick={publishComment}>
                    发表评论
                  </Button>
                </Form.Item>
              </>
            }
          />
        </div>
        <Divider />
        <div>
          <h3 id="comment">全部评论（{commentList?.length}）</h3>
          <List
            className="comment-list"
            dataSource={commentList}
            renderItem={(comment: Comment) => (
              <li>
                <AntdComment
                  author={comment.username}
                  avatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  content={comment.commentbody}
                />
                <Divider />
              </li>
            )}
          />
        </div>
      </Content>
      <Aside>施工中🚧</Aside>
    </ArticleContainer>
  )
}

export default Article
