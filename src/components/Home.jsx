/** @jsx jsx **/
import { css, jsx } from '@emotion/react'
import { useState, useEffect } from 'react'
import { Skeleton, Card, Avatar } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import * as blogApi from '../api/blog'

const Home = () => {
  let history = useHistory()
  const { Meta } = Card
  const [blogList, setBlogList] = useState([])

  useEffect(() => {
    blogApi
      .getBlogList()
      .then(res => {
        console.log(res)
        setBlogList(res.data.blogs)
      })
      .catch(err => {
        console.log(err)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getBlogDetail = id => {
    return () => {
      console.log(id)
      let currentBlog = blogList.find(blog => {
        return blog.id === id
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
        <Skeleton loading={blogList ? false : true} avatar active />
        {blogList.map((blog, index) => {
          return (
            <Card
              onClick={getBlogDetail(blog.id)}
              key={index}
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />
              ]}
              css={css`
                margin: 10px;
                cursor: pointer;
              `}
            >
              <Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={blog.title}
                // description={blog.content}
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
