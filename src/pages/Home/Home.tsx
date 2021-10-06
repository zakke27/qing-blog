/** @jsxImportSource  @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Avatar, List, message } from 'antd'
import { LikeOutlined, MessageOutlined, CalendarTwoTone } from '@ant-design/icons'
import { Article } from '../../types/interfaces'
import { getArticleList } from '../../api/article'
import Filling from '../../components/Filing/Filling'
import MDEditor from '@uiw/react-md-editor'
import useScrollToTop from '../../hooks/useScrollToTop'

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
  /* display: flex; */
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  /* background-color: lightgreen; */
  height: 580px;
`

type ArticleList = Article[]

const Home: React.FC = () => {
  const history = useHistory()
  const [articleList, setArticleList] = useState<ArticleList>([])
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [pages, setPages] = useState<number>(2)

  useScrollToTop()

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

  const getTimeState = () => {
    // 获取当前时间
    let timeNow = new Date()
    // 获取当前小时
    let hours = timeNow.getHours()
    // 设置默认文字
    let text = ``
    // 判断当前时间段
    if (hours >= 0 && hours <= 10) {
      text = `早上好`
    } else if (hours > 10 && hours <= 14) {
      text = `中午好`
    } else if (hours > 14 && hours <= 18) {
      text = `下午好`
    } else if (hours > 18 && hours <= 24) {
      text = `晚上好`
    }
    console.log(`hours >>>>>`, hours)
    console.log(`text >>>>`, text)
    // 返回当前时间段对应的状态
    return text
  }

  return (
    <HomeContainer>
      <Content>
        <Title>首页文章列表</Title>
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
                      <LikeOutlined /> {article.articlehot}
                    </div>,
                    <div key="comment">
                      <MessageOutlined />
                    </div>
                  ]}
                >
                  <h3
                    css={css`
                      font-weight: bold;
                    `}
                  >
                    {article.articletitle}
                  </h3>
                  <div
                    css={css`
                      width: 650px;
                      height: 25px;
                      /* background-color: lightcyan; */
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    `}
                  >
                    <MDEditor.Markdown source={article.articlebody} />
                  </div>
                </List.Item>
              )
            }}
          />
        </InfiniteScroll>
      </Content>
      <Aside>
        <div
          css={css`
            background-color: #fff;
            height: 6rem;
            text-align: center;
            padding: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <span
            css={css`
              line-height: 6rem;
              margin-left: 10px;
              font-size: 27px;
            `}
          >
            {getTimeState()}🎉🎉🎉
          </span>
        </div>

        <div
          css={css`
            background-color: #fff;
            margin-top: 15px;
            height: 20rem;
            padding: 10px;
          `}
        >
          <h4>网站推荐</h4>
          <ul
            css={css`
              & li {
                list-style: none;
                margin: 20px;
              }
            `}
          >
            <li>
              <a href="https://juejin.cn/">掘金 - 代码不止，掘金不停</a>
            </li>
            <li>
              <a href="https://segmentfault.com/">SegmentFault 思否</a>
            </li>
            <li>
              <a href="https://www.jianshu.com/">简书 - 创作你的创作</a>
            </li>
            <li>
              <a href="https://gitee.com/">Gitee - 基于 Git 的代码托管和研发协作平台</a>
            </li>
          </ul>
        </div>
        <div
          css={css`
            background-color: #fff;
            margin-top: 15px;
            height: 6rem;
            padding: 10px;
          `}
        >
          <h4>本站源码地址</h4>
          <a
            css={css`
              margin: 20px;
            `}
            href="https://github.com/zakke27/qing-blog"
          >
            Github
          </a>
          <br />
        </div>
        <div
          css={css`
            margin-top: 15px;
          `}
        >
          <Filling />
        </div>
      </Aside>
    </HomeContainer>
  )
}

export default Home
