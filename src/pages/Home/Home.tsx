/** @jsxImportSource  @emotion/react */
import { css, jsx } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Avatar, List, message } from 'antd'
import { LikeOutlined, MessageOutlined } from '@ant-design/icons'

import { getArticleList } from '../../api/article'
import Filling from '../../components/Filing/Filling'

const HomeContainer = styled.div`
  display: flex;
  flex-flow: row;
  /* background-color: lightgreen; */
  width: 960px;
`
const Content = styled.div`
  flex: 3;
  background-color: #ffffff;
  margin-right: 1.5rem;
  height: 100%;
`
const Title = styled.h3`
  /* background-color: #ffffff; */
  margin: 10px;
  /* height: 1.5rem; */
`
const ArticleList = styled(List)`
  margin: 10px;
  cursor: pointer;
  padding: 0 10px;
`

const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  background-color: #ffffff;
  height: 580px;
`
// 文章列表中每一篇文章
interface Article {
  id: number
  author: string
  avatar: string
  title: string
  content: string
  likeCount: number
  comments: {
    id: number
    author: string
    content: string
    replyDate: string
  }[]
}

const Home: React.FC = () => {
  const history = useHistory()
  const [articleList, setArticleList] = useState([])
  const [hasMore, setHasMore] = useState(true)

  // 首屏加载文章列表
  useEffect(() => {
    getArticleList()
      .then(res => {
        // console.log(res)
        if (res.data.code === 200) {
          setArticleList(res.data.data)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  // 处理滚动加载
  const handleInfiniteOnLoad = () => {
    if (articleList.length > 200) {
      message.warning('Infinite List loaded all')
      setHasMore(false)
      return
    }
    getArticleList()
      .then(res => {
        // console.log(res)
        const temp = articleList.concat(res.data.data)
        setArticleList(temp)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <HomeContainer>
      <Content>
        <Title>文章列表，无限滚动</Title>
        <hr />
        <InfiniteScroll
          dataLength={articleList.length}
          next={handleInfiniteOnLoad}
          hasMore={hasMore}
          scrollThreshold={0.97}
          loader={undefined}
        >
          <ArticleList
            dataSource={articleList}
            itemLayout="vertical"
            renderItem={(article: any) => {
              return (
                <List.Item
                  key={article.id}
                  onClick={() => {
                    history.push(`/article/${article.id}`)
                  }}
                  actions={[
                    <div key="author">作者：{article.author}</div>,
                    <div key="like">
                      <LikeOutlined /> {article.like}
                    </div>,
                    <div key="comment">
                      <MessageOutlined /> {article.comments.length}
                    </div>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={article.avatar} />}
                    title={article.title}
                  />
                </List.Item>
              )
            }}
          />
        </InfiniteScroll>
      </Content>
      <Aside>
        施工中🚧
        <div>将年不负，愿你挥霍最好的年华</div>
        <div
          css={css`
            position: relative;
            top: 33px;
          `}
        >
          <Filling />
        </div>
      </Aside>
    </HomeContainer>
  )
}

export default Home
