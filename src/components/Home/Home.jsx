/** @jsx jsx **/
import { css, jsx } from '@emotion/react'
import { useState, useEffect } from 'react'
import { Avatar, List, message } from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import { LikeOutlined, MessageOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import * as articleApi from '../../api/article'
import useScrollToTop from '../../hooks/useScrollToTop'

const Home = () => {
  let history = useHistory()

  const [articleList, setArticleList] = useState([])
  const [hasMore, setHasMore] = useState(true)

  useScrollToTop()

  useEffect(() => {
    articleApi
      .getArticleList()
      .then(res => {
        // console.log(res.data)
        setArticleList(res.data.articleList)
      })
      .catch(err => console.log(err))
  }, [])

  // 处理滚动加载
  const handleInfiniteOnLoad = () => {
    if (articleList.length > 200) {
      message.warning('Infinite List loaded all')
      setHasMore(false)
      return
    }
    articleApi
      .getArticleList()
      .then(res => {
        // console.log(res)
        let temp = articleList.concat(res.data.articleList)
        setArticleList(temp)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div
      css={css`
        display: flex;
        flex-flow: row nowrap;
        /* background-color: lightpink; */
        padding: 10px;
      `}
    >
      <div
        css={css`
          flex: 3;
          margin-right: 1.5rem;
          background-color: #ffff;
          height: 100%;
        `}
      >
        <div
          css={css`
            background-color: #ffffff;
            margin: 10px;
            height: 1.5rem;
          `}
        >
          文章列表
        </div>
        <hr />
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={handleInfiniteOnLoad}
          hasMore={hasMore}
          threshold={150}
        >
          <List
            css={css`
              margin: 10px;
              cursor: pointer;
              padding: 0 10px;
            `}
            itemLayout="vertical"
            dataSource={articleList}
            renderItem={article => (
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
                <List.Item.Meta avatar={<Avatar src={article.avatar} />} title={article.title} />
              </List.Item>
            )}
          />
        </InfiniteScroll>
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
