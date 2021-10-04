/** @jsxImportSource  @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useState, useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import ArticleControl from '../../components/UserArticleControl/UserArticleControl'
import UserSidebar from '../../components/UserSidebar/UserSidebar'
import UserProfile from '../../components/UserProfile/UserProfile'

import { getPersonalArticles } from '../../api/user'
import { deleteArticle } from '../../api/article'

import { getUser } from '../../utils/Auth'
import AuthRoute from '../../routes/AuthRoute'
import { Article } from '../../types/interfaces'
import { message } from 'antd'

const UserCenterContainer = styled.div`
  /* background-color: #ffffff; */
  margin-bottom: 12px;
  min-width: 1200px;
  font-size: 16px;
`
const Main = styled.main`
  background-color: lightgreen;
  margin-left: 264px;
  width: calc(100% - 264px);
`

const UserCenter: React.FC = () => {
  const [userArticleList, setUserArticleList] = useState<any>([]) // HACK bad

  useEffect(() => {
    // 请求用户个人文章列表
    const fetchData = async () => {
      try {
        const res = await getPersonalArticles(getUser()?.userid)
        if (res.data[0]?.articleid) {
          // console.log(res)
          setUserArticleList(res.data)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  const deleteUserArticle = (articleid: number) => {
    return async () => {
      try {
        const res = await deleteArticle(articleid)
        if (res.data.code === 7003) {
          console.log(res)
          message.success('删除文章成功', 2)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
  return (
    <UserCenterContainer>
      <UserSidebar />
      <Main>
        <div
          css={css`
            background-color: white;
            min-height: calc(100vh - 120px);
            padding: 10px 20px;
          `}
        >
          <Switch>
            <AuthRoute exact path="/user" roles={[0, 1]}>
              <h2>首页🚧</h2>
            </AuthRoute>
            <AuthRoute path="/user/article-control" roles={[0, 1]}>
              {userArticleList && (
                <ArticleControl
                  userArticleList={userArticleList}
                  deleteUserArticle={deleteUserArticle}
                />
              )}
            </AuthRoute>
            <AuthRoute path="/user/profile" roles={[0, 1]}>
              <UserProfile />
            </AuthRoute>
          </Switch>
        </div>
      </Main>
    </UserCenterContainer>
  )
}

export default UserCenter
