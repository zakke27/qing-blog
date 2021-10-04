/** @jsxImportSource  @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Avatar, List, message } from 'antd'
import { LikeOutlined, MessageOutlined } from '@ant-design/icons'
import { Article } from '../../types/interfaces'
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

type ArticleList = Article[]

const Home: React.FC = () => {
  const history = useHistory()
  const [articleList, setArticleList] = useState<ArticleList>([])
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [pages, setPages] = useState<number>(2)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getArticleList(1) // 请求文章
        if (res?.data) {
          console.log(res)
          setArticleList(res.data)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  // 处理滚动加载 再次请求数据
  const handleInfiniteOnLoad = async () => {
    // if (articleList.length > 200) {
    //   message.warning('Infinite List loaded all')
    //   setHasMore(false)
    //   return
    // }

    try {
      console.log(pages)
      const res = await getArticleList(pages) // 请求文章列表
      if (res) {
        console.log(res)
        const temp = articleList.concat(res.data)
        setArticleList(temp)
        setPages(pages + 1)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <HomeContainer>
      <Content>
        <Title>芜湖 起飞🚀🚀🚀</Title>
        <hr />
        <InfiniteScroll
          dataLength={articleList.length}
          next={handleInfiniteOnLoad}
          hasMore={hasMore}
          scrollThreshold={0.97}
          // loader={<h5>loading...</h5>}
          loader={undefined}
        >
          <ArticleList
            dataSource={articleList}
            itemLayout="vertical"
            renderItem={(article: any) => {
              return (
                <List.Item
                  key={article.articleid}
                  onClick={() => {
                    history.push(`/article/${article.articleid}`)
                  }}
                  actions={[
                    <div key="author">作者：{article.username}</div>,
                    <div key="like">
                      <LikeOutlined /> {article.articlelikecount}
                    </div>
                    // <div key="comment">
                    //   <MessageOutlined /> {article}
                    // </div>
                  ]}
                >
                  <List.Item.Meta
                    // avatar={<Avatar src={article.avatar} />}
                    title={article.articletitle}
                  />
                </List.Item>
              )
            }}
          />
        </InfiniteScroll>
      </Content>
      <Aside>
        施工中🚧
        <div>🤠🤠🤠🤠🤠🤠🤠</div>
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
