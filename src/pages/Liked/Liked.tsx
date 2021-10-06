/** @jsxImportSource  @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Avatar, List, message } from 'antd'
import { LikeOutlined, MessageOutlined } from '@ant-design/icons'
import { Article } from '../../types/interfaces'
import { getArticleDetail, getArticleList, getHotArticleList } from '../../api/article'
import Filling from '../../components/Filing/Filling'
import { getUserLiked } from '../../api/user'
import { getUser } from '../../utils/Auth'

const LikedContainer = styled.div`
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
  /* background-color: #ffffff; */
  height: 580px;
`

type ArticleList = Article[]

const Liked: React.FC = () => {
  const history = useHistory()
  const [articleList, setArticleList] = useState<ArticleList>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserLiked(getUser()?.userid)
        if (res?.data) {
          console.log(res)
          let tempArr = []
          for (let i = 0; i < res?.data.length; i++) {
            const res2 = await getArticleDetail(res?.data[i]?.articleid)
            tempArr.push(res2?.data)
          }
          console.log({ tempArr })
          setArticleList(tempArr)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  return (
    <LikedContainer>
      <Content>
        <Title>我赞过的</Title>
        <hr />
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
                    <LikeOutlined /> {article.articlehot}
                  </div>,
                  <div key="comment">
                    <MessageOutlined />
                  </div>
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
      </Content>
      <Aside />
    </LikedContainer>
  )
}
export default Liked
