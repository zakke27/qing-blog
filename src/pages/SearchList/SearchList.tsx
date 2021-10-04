import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useLocation, useHistory } from 'react-router-dom'
import { List, ListProps } from 'antd'
import { LikeOutlined, MessageOutlined } from '@ant-design/icons'
import { searchArticleList } from '../../api/article'
import { Article } from '../../types/interfaces'

const SearchListContainer = styled.div`
  display: flex;
  flex-flow: row;
  /* background-color: lightgreen; */
  max-width: 700px;
`
const Content = styled.div`
  flex: 1;
  background-color: #ffffff;
  /* margin-right: 1.5rem; */
  height: 100%;
`
const ArticleList = styled(List)`
  margin: 10px;
  cursor: pointer;
  padding: 0 10px;
`

type ArticleList = Article[]

const SearchList: React.FC = () => {
  const history = useHistory()
  const { search } = useLocation()
  // 获取查询参数
  const title = new URLSearchParams(search).get('title') ?? ''

  const [articleList, setArticleList] = useState<ArticleList>()

  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        const res = await searchArticleList(title)
        if (res.data) {
          console.log(res)
          setArticleList(res.data)
        }
      } catch (error) {
        console.error(error)
      }
      fetchSearchData()
    }
  }, [title])
  return (
    <SearchListContainer>
      <Content>
        <ArticleList
          dataSource={articleList}
          itemLayout="vertical"
          renderItem={(article:any) => {
            return (
              <List.Item
                key={article.articleid}
                onClick={() => {
                  history.push(`/article/${article.articleid}`)
                }}
                actions={[
                  <div key="author">作者：{article.username}</div>,
                  <div key="like">
                    <LikeOutlined /> {article?.articlehot}
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
      </Content>
    </SearchListContainer>
  )
}

export default SearchList
