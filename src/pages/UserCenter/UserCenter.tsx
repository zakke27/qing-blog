/** @jsxImportSource  @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useState, useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import ArticleControl from '../../components/ArticleControl/ArticleControl'
import UserSidebar from '../../components/UserSidebar/UserSidebar'

import { getPersonalArticles } from '../../api/user'
import { getUser } from '../../utils/Auth'
import UserProfile from '../../components/UserProfile/UserProfile'
import AuthRoute from '../../routes/AuthRoute'

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
  const [userArticleList, setUserArticleList] = useState<[] | undefined>([])

  useEffect(() => {
    ;(async () => {
      let res = await getPersonalArticles(getUser()?.id)
      if (res.data?.code === 200) {
        console.log(res)
        setUserArticleList(res.data.data)
      }
    })()
  }, [])

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
              <ArticleControl userArticleList={userArticleList} />
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
