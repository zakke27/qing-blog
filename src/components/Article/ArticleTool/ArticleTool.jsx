/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { LikeFilled, LikeOutlined, CommentOutlined, WarningOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

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

const ArticleTool = props => {
  const { articleInfo, likeArticle, isLiked } = props

  // 锚点跳转
  const scrollToAnchor = anchorName => {
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName)
      if (anchorElement) {
        anchorElement.scrollIntoView({ block: 'center' })
      }
    }
  }

  return (
    <div>
      <div
        css={css`
          position: fixed;
          /* width: 50px; */
          height: 140px;
          /* background-color: green; */
          margin-left: -6.5rem;
          margin-top: 5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        `}
      >
        <div
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
          <div>{articleInfo && articleInfo.likeCount}</div>
        </div>
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
    </div>
  )
}

ArticleTool.propTypes = {
  articleInfo: PropTypes.object,
  likeArticle: PropTypes.func,
  isLiked: PropTypes.bool
}

export default ArticleTool
