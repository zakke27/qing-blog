import React from 'react'
import './Layout.scss'
import { Layout as AntdLayout } from 'antd'
import { Route, Switch } from 'react-router-dom'
import NavBar from '../navbar/NavBar'
import Home from '../../pages/home/Home'
import Hot from '../../pages/hot/Hot'
import History from '../../pages/history/History'
import NotFound from '../../pages/404/NotFound'

const Layout = () => {
  const { Content } = AntdLayout
  return (
    <AntdLayout>
      <NavBar />
      <Content className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/hot">
            <Hot />
          </Route>
          <Route path="/history">
            <History />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Content>
    </AntdLayout>
  )
}

export default Layout
