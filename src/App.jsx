import React, { Suspense, lazy } from 'react'
import './App.css'
import { Switch, Route } from 'react-router-dom'

import Layout from './pages/Layout'
import Loading from './components/Loading'

const Write = lazy(() => import('./pages/Write'))

const App = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/write">
            <Write />
          </Route>
          <Route path="/">
            <Layout />
          </Route>
        </Switch>
      </Suspense>
    </>
  )
}

export default App
