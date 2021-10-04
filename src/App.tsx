import React, { useState, useEffect } from 'react'
import './App.css'
import { Switch, Route, useLocation } from 'react-router-dom'
import styled from '@emotion/styled'

import NavBar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Hot from './pages/Hot/Hot'
import Liked from './pages/Liked/Liked'
import LoginModal from './pages/LoginModal/LoginModal'
import Article from './pages/Article/Article'
import Write from './pages/Write/Write'
import UserCenter from './pages/UserCenter/UserCenter'
import NotFound from './components/404/NotFound'
import Admin from './pages/Admin/Admin'
import AuthRoute from './routes/AuthRoute'
import SearchList from './pages/SearchList/SearchList'
import Follow from './pages/Follow/Follow'

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Main = styled.div`
  margin-top: 5.5rem;
  /* background-color: inherit; */
  min-width: 960px;
  padding: 10px;
  font-size: 16px;
`

const noNavPage = [
  '/user/write',
  '/admin',
  '/admin/user-control',
  '/admin/article-control'
]

const App: React.FC = () => {
  const location = useLocation()
  const [modalVisible, setModalVisible] = useState(false)

  // 是否展示Modal
  const showModal = () => {
    setModalVisible(!modalVisible)
  }

  return (
    <AppContainer>
      {/* 头部导航栏 */}
      {!noNavPage.includes(location.pathname) && <NavBar showModal={showModal} />}
      {/* {!(location?.pathname === '/user/write') && <NavBar showModal={showModal} />} */}
      {/* 内容主体区域 */}
      <Main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/search">
            <SearchList />
          </Route>
          <Route path="/hot">
            <Hot />
          </Route>
          <AuthRoute path="/user/liked" roles={[0, 1]}>
            <Liked />
          </AuthRoute>
          <AuthRoute path="/user/follow" roles={[0, 1]}>
            <Follow />
          </AuthRoute>
          <AuthRoute path="/user/write" roles={[0, 1]}>
            <Write />
          </AuthRoute>
          <Route path="/article/:id">
            <Article showModal={showModal} />
          </Route>
          <AuthRoute path="/admin" roles={[0]}>
            <Admin />
          </AuthRoute>
          <AuthRoute path="/user" roles={[0, 1]}>
            <UserCenter />
          </AuthRoute>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Main>
      <LoginModal modalVisible={modalVisible} showModal={showModal} />
    </AppContainer>
  )
}

export default App
