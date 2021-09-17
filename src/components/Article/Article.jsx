/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import styled from '@emotion/styled'
import MDEditor from '@uiw/react-md-editor'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Comment, Avatar, Form, Input, List, Divider } from 'antd'
import { LikeFilled, LikeOutlined, CommentOutlined, WarningOutlined } from '@ant-design/icons'
import * as articleApi from '../../api/article'
import useScrollToTop from '../../hooks/useScrollToTop'

const IconDiv = styled.div`
  margin: 8px 0;
  width: 36px;
  height: 36px;
  background-color: #fff;
  text-align: center;
  border-radius: 50%;
  font-size: 16px;
  padding: 2.4px;
  border: 1px solid silver;
  cursor: pointer;
  :hover {
    color: #1890ff;
    border-color: #1890ff;
  }
`
const { TextArea } = Input

const Article = () => {
  let { id } = useParams()
  // console.log('params', params)

  const [articleInfo, setArticleInfo] = useState(null)

  useScrollToTop()
  useEffect(() => {
    articleApi
      .getArticleInfoById(id)
      .then(res => {
        console.log(res)
        setArticleInfo(res.data.articleInfo)
      })
      .catch(err => {
        console.log(err)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 锚点跳转
  const scrollToAnchor = anchorName => {
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName)
      if (anchorElement) {
        anchorElement.scrollIntoView({ block: 'center' })
        // scroll.scrollTo('100px')
      }
    }
  }

  return (
    <div
      css={css`
        /* background-color: #ffffff; */
        width: 960px;
        padding: 10px;
        display: flex;
        flex-direction: row;
      `}
    >
      <div
        css={css`
          position: fixed;
          width: 50px;
          height: 400px;
          margin-left: -6.5rem;
          margin-top: 5rem;
        `}
      >
        <IconDiv>
          <LikeOutlined />
        </IconDiv>
        <IconDiv
          onClick={() => {
            scrollToAnchor('comment')
          }}
        >
          <CommentOutlined />
        </IconDiv>
        <IconDiv>
          <WarningOutlined />
        </IconDiv>
      </div>
      <div
        css={css`
          background-color: #ffffff;
          flex: 3;
          margin-right: 1.5rem;
          padding: 10px;
        `}
      >
        {articleInfo ? (
          <React.Fragment>
            <div>
              <div>作者：{articleInfo.author}</div>
              <h2>{articleInfo.title}</h2>
              <br />
              <MDEditor.Markdown source={articleInfo.content} />
              <br />
            </div>
            <div>
              <Comment
                avatar={
                  <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Han Solo"
                  />
                }
                content={
                  <>
                    <Form.Item>
                      <TextArea rows={4} placeholder="输入评论（Enter换行）" />
                    </Form.Item>
                    <Form.Item
                      css={css`
                        float: right;
                      `}
                    >
                      <Button htmlType="submit" type="primary">
                        Add Comment
                      </Button>
                    </Form.Item>
                  </>
                }
              />
            </div>
            <Divider
              css={css`
                border-width: 2px;
              `}
            />
            <div>
              <h3 id="comment">全部评论（{articleInfo.comments.length}）</h3>
              <List
                className="comment-list"
                dataSource={articleInfo.comments}
                renderItem={comment => (
                  <li>
                    <Comment
                      author={comment.author}
                      avatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                      content={comment.content}
                      datetime={comment.replyDate}
                    />
                    <Divider />
                  </li>
                )}
              />
            </div>
          </React.Fragment>
        ) : null}
      </div>
      <div
        css={css`
          background-color: #ffffff;
          flex: 1;
          height: 80vh;
        `}
      >
        111
      </div>
    </div>
  )
}

export default Article
