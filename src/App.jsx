import React, { lazy, Suspense } from 'react'
import './App.css'
import { Switch, Route } from 'react-router-dom'
import Loading from './components/loading/Loading'
import Layout from './components/layout/Layout'

const Login = lazy(() => import('./pages/login/Login'))
const Register = lazy(() => import('./pages/register/Register'))

const App = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Layout />
          </Route>
          <Route path="*">
            <h2>404</h2>
          </Route>
        </Switch>
      </Suspense>
    </div>
  )
}

export default App
