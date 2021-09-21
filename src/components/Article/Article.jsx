/** @jsx jsx */
import { css, jsx } from '@emotion/react'

import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'

import ArticleTool from './ArticleTool/ArticleTool'
import ArticleContent from './ArticleContent/ArticleContent'

import * as articleApi from '../../api/article'
import * as userApi from '../../api/user'
import useScrollToTop from '../../hooks/useScrollToTop'
import { getToken, getUser } from '../../utils/Auth'
import PropTypes from 'prop-types'

const Article = props => {
  let { id: articleId } = useParams()
  const { showModal } = props

  const [articleInfo, setArticleInfo] = useState(null)
  const [isComment, setIsComment] = useState(true)
  const [isLiked, setIsLiked] = useState(false)

  const commentRef = useRef()

  useScrollToTop()

  useEffect(() => {
    // 根据文章id请求文章详细信息
    articleApi
      .getArticleInfoById(articleId)
      .then(res => {
        // console.log(res)
        if (res.data.code === 200) {
          // console.log(11)
        }
        setArticleInfo(res.data.articleInfo)
      })
      .catch(err => {
        console.log(err)
      })

    // 根据用户id请求用户点赞过的文章列表
    if (getToken()) {
      userApi
        .getUserLikeArticleByUid(getUser().id)
        .then(res => {
          console.log(1111)
          setIsLiked(res.data.likeArticleList.includes(articleId * 1))
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [articleId])

  // 点赞文章 like
  const likeArticle = () => {
    if (getToken()) {
      articleApi
        .likeArticleById(articleId)
        .then(res => {
          if (res.data.code === 200) {
            if (isLiked) {
              setIsLiked(false)
              setArticleInfo({ ...articleInfo, likeCount: articleInfo.likeCount - 1 })
            } else {
              setIsLiked(true)
              setArticleInfo({ ...articleInfo, likeCount: articleInfo.likeCount + 1 })
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      showModal()
    }
  }

  const writeComment = () => {
    setIsComment(false)
    if (!getToken()) {
      showModal()
      commentRef.current.blur()
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
      {/* 点赞评论举报 按钮 */}
      <ArticleTool articleInfo={articleInfo} likeArticle={likeArticle} isLiked={isLiked} />
      {/* 文章主体区 */}
      <ArticleContent
        articleInfo={articleInfo}
        isComment={isComment}
        setIsComment={setIsComment}
        writeComment={writeComment}
        commentRef={commentRef}
      />
      <div
        css={css`
          background-color: #ffffff;
          flex: 1;
          height: 80vh;
          margin-left: 1.5rem;
        `}
      >
        111
      </div>
    </div>
  )
}

Article.propTypes = {
  showModal: PropTypes.func
}

export default Article
