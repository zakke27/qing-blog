/** @jsx jsx **/
import { css, jsx } from '@emotion/react'
import { useState, useEffect } from 'react'
import { Skeleton, Card, Avatar, List, Spin } from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import { LikeOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import * as blogApi from '../../api/blog'

const { Meta } = Card

const Home = () => {
  let history = useHistory()

  const [articleList, setArticleList] = useState([])

  useEffect(() => {
    blogApi
      .getBlogList()
      .then(res => {
        console.log(res.data)
        setArticleList(res.data.articles)
      })
      .catch(err => console.log(err))
  }, [])

  const getArticleDetail = id => {
    return () => {
      console.log(id)
      let currentBlog = articleList.find(article => {
        return article.id === id
      })
      history.push({ pathname: `/post/${id}`, state: currentBlog })
    }
  }

  return (
    <div
      css={css`
        display: flex;
        flex-flow: row nowrap;
        background-color: lightpink;
        padding: 10px;
      `}
    >
      <div
        css={css`
          flex: 3;
          margin-right: 1.5rem;
          background-color: lightblue;
          height: 100%;
        `}
      >
        <div
          css={css`
            background-color: #ffffff;
            margin: 10px;
          `}
        >
          top-bar
        </div>
        {/* <Skeleton loading={articleList ? false : true} avatar active /> */}

        {articleList.map((article, index) => {
          return (
            <Card
              onClick={getArticleDetail(article.id)}
              key={index}
              actions={[
                <LikeOutlined key="like" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />
              ]}
              css={css`
                margin: 10px;
                cursor: pointer;
              `}
            >
              <p>作者：{article.author}</p>
              <Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={article.title}
              />
            </Card>
          )
        })}
      </div>

      <div
        css={css`
          display: flex;
          flex: 1;
          background-color: #ffffff;
          height: 500px;
          justify-content: center;
          align-items: center;
        `}
      >
        广告位招租🚧
      </div>
    </div>
  )
}

export default Home
