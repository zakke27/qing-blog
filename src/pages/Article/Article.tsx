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
import {
  addComment,
  followUser,
  getFollowUserList,
  getUserLiked,
  unFollowUser
} from '../../api/user'
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
import {
  ArticleDetail,
  Comment,
  NewComment,
  NewFollow,
  NewUnFollow
} from '../../types/interfaces'
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
  padding-top: 20px;
`
const Aside = styled.aside`
  /* display: flex; */
  flex-direction: column;
  flex: 1;
  /* background-color: #ffffff; */
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
  const userId = getUser()?.userid
  const [articleDetail, setArticleDetail] = useState<ArticleDetail>()
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [isFollow, setIsFollow] = useState<boolean>(false)
  const [commentList, setCommentList] = useState<Comment[]>([])
  const [commentValue, setCommentValue] = useState('')

  useScrollToTop()

  // ????????????id????????????????????????
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
  }, [articleId])

  // ????????????????????????
  useEffect(() => {
    const fetchUserLiked = async () => {
      try {
        if (getUser()?.userid) {
          const res = await getUserLiked(getUser()?.userid)
          if (res.data) {
            console.log(res)
            const temp = res.data.some((item: any) => articleId === item.articleid)
            console.log(temp)
            setIsLiked(temp)
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchUserLiked()
  }, [articleId, userId])

  // ??????????????????
  useEffect(() => {
    const fetchFollowList = async () => {
      try {
        const res = await getFollowUserList(getUser()?.userid)
        if (res.data) {
          console.log(res)
          const temp = res.data.some((item: any) => articleDetail?.userid === item.friendid)
          console.log('getFollowUserList', temp)
          setIsFollow(temp)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchFollowList()
  }, [articleDetail?.userid, userId])

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
    fetchCommentList() // ????????????id????????????????????????
  }, [fetchCommentList])

  // ?????????????????????
  const likeArticle = async () => {
    // FIXME
    if (getUser()?.userid && articleDetail) {
      if (!isLiked) {
        // ??????
        try {
          const res = await saveArticleLike(userId, articleId)
          if (res.data.code === 501) {
            console.log(res)
            setIsLiked(true)
            setArticleDetail({
              ...articleDetail,
              articlehot: articleDetail?.articlehot + 1
            })
            // message.success('????????????', 2)
          }
        } catch (error) {
          console.error(error)
        }
      } else {
        // ????????????
        try {
          const res = await cancelArticleLike(userId, articleId)
          if (res.data.code === 601) {
            console.log(res)
            setIsLiked(false)
            setArticleDetail({
              ...articleDetail,
              articlehot: articleDetail?.articlehot - 1
            })
            // message.success('??????????????????', 2)
          }
        } catch (error) {
          console.error(error)
        }
      }
    } else {
      // ???????????????????????????
      showModal()
    }
  }

  // ????????????
  const publishComment = async () => {
    if (!getUser()?.userid) {
      showModal()
      return
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
        message.success('????????????', 2)
        setCommentValue('')
      }
      if (res.data.code === 3002) {
        message.error('????????????', 2)
      }
    } catch (error) {
      console.error(error)
    }
  }

  // ??????
  const handleFollow = async () => {
    if (!getUser()?.userid) {
      showModal()
      return
    }
    const newFollow: NewFollow = {
      userid: getUser()?.userid,
      friendid: articleDetail?.userid as number,
      username: articleDetail?.username as string
    }
    try {
      const res = await followUser(newFollow)
      if (res) {
        console.log(res)
      }
      if (res.data.code === 202) {
        console.log({ res })
        setIsFollow(true)
        message.success('????????????', 2)
      }
    } catch (error) {
      console.error(error)
    }
  }

  // ????????????
  const handleUnFollow = async () => {
    if (!getUser()?.userid) {
      showModal()
      return
    }
    const newUnFollow: NewUnFollow = {
      userid: getUser()?.userid as number,
      friendid: articleDetail?.userid as number
    }
    try {
      const res = await unFollowUser(newUnFollow)
      if (res.data.code === 301) {
        console.log({ res })
        setIsFollow(false)
        message.success('??????????????????', 2)
      }
    } catch (error) {
      console.error(error)
    }
  }

  // ????????????
  const scrollToAnchor = (anchorName: string) => {
    if (anchorName) {
      const anchorElement = document.getElementById(anchorName)
      if (anchorElement) {
        anchorElement.scrollIntoView({ block: 'center' })
      }
    }
  }
  const getTimeState = () => {
    // ??????????????????
    let timeNow = new Date()
    // ??????????????????
    let hours = timeNow.getHours()
    // ??????????????????
    let text = ``
    // ?????????????????????
    if (hours >= 0 && hours <= 10) {
      text = `?????????`
    } else if (hours > 10 && hours <= 14) {
      text = `?????????`
    } else if (hours > 14 && hours <= 18) {
      text = `?????????`
    } else if (hours > 18 && hours <= 24) {
      text = `?????????`
    }
    console.log(`hours >>>>>`, hours)
    console.log(`text >>>>`, text)
    // ????????????????????????????????????
    return text
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
          <div>{articleDetail?.articlehot}</div>
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
            <div>
              <span>?????????{articleDetail.username}</span>
              {getUser()?.userid === articleDetail?.userid ? null : (
                <Button
                  onClick={isFollow ? handleUnFollow : handleFollow}
                  css={css`
                    float: right;
                  `}
                >
                  {isFollow ? '?????????' : '??????'}
                </Button>
              )}
            </div>

            <h4
              css={css`
                font-size: 2rem;
              `}
            >
              {articleDetail.articletitle}
            </h4>
            <MDEditor.Markdown source={articleDetail.articlebody} />
            <br />
          </div>
        )}
        {!!articleDetail && (
          <>
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
                        placeholder="???????????????Enter?????????"
                        value={commentValue}
                        onChange={e => setCommentValue(e.target.value)}
                        disabled={!getUser()?.userid}
                      />
                    </Form.Item>
                    <Form.Item
                      css={css`
                        float: right;
                      `}
                    >
                      <Button
                        htmlType="submit"
                        type="primary"
                        onClick={publishComment}
                        disabled={!getUser()?.userid}
                      >
                        ????????????
                      </Button>
                    </Form.Item>
                  </>
                }
              />
            </div>
            <Divider />
            <div>
              <h3 id="comment">???????????????{commentList?.length}???</h3>
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
          </>
        )}
      </Content>
      <Aside>
        <div
          css={css`
            background-color: #fff;
            height: 6rem;
            text-align: center;
            padding: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <span
            css={css`
              line-height: 6rem;
              margin-left: 10px;
              font-size: 27px;
            `}
          >
            {getTimeState()}????????????
          </span>
        </div>
        <div
          css={css`
            background-color: #fff;
            margin-top: 15px;
            height: 20rem;
            padding: 10px;
          `}
        >
          <h4>????????????</h4>
          <ul
            css={css`
              & li {
                list-style: none;
                margin: 20px;
              }
            `}
          >
            <li>
              <a href="https://juejin.cn/">?????? - ???????????????????????????</a>
            </li>
            <li>
              <a href="https://segmentfault.com/">SegmentFault ??????</a>
            </li>
            <li>
              <a href="https://www.jianshu.com/">?????? - ??????????????????</a>
            </li>
            <li>
              <a href="https://gitee.com/">Gitee - ?????? Git ????????????????????????????????????</a>
            </li>
          </ul>
        </div>
        <div
          css={css`
            background-color: #fff;
            margin-top: 15px;
            height: 6rem;
            padding: 10px;
          `}
        >
          <h4>??????????????????</h4>
          <a
            css={css`
              margin: 20px;
            `}
            href="https://github.com/zakke27/qing-blog"
          >
            Github
          </a>
          <br />
        </div>
      </Aside>
    </ArticleContainer>
  )
}

export default Article
