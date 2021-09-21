/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React from 'react'
import MDEditor from '@uiw/react-md-editor'
import { Button, Comment, Avatar, Form, Input, List, Divider } from 'antd'
import PropTypes from 'prop-types'

const ArticleContent = props => {
  const { articleInfo, isComment, setIsComment, writeComment, commentRef } = props

  return (
    <div
      css={css`
        background-color: #ffffff;
        flex: 3;
        padding: 10px 20px;
      `}
    >
      {articleInfo ? (
        <>
          <div>
            <h1>{articleInfo.title}</h1>
            <div>作者：{articleInfo.author}</div>
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
                    <Input.TextArea
                      ref={commentRef}
                      rows={4}
                      placeholder="输入评论（Enter换行）"
                      onFocus={() => {
                        writeComment()
                      }}
                      onBlur={() => {
                        setIsComment(true)
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    css={css`
                      float: right;
                    `}
                  >
                    <Button htmlType="submit" type="primary" disabled={isComment}>
                      发表评论
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
        </>
      ) : null}
    </div>
  )
}

ArticleContent.propTypes = {
  articleInfo: PropTypes.object,
  setIsComment: PropTypes.func,
  isComment: PropTypes.bool,
  writeComment: PropTypes.func,
  commentRef: PropTypes.object
}

export default ArticleContent
