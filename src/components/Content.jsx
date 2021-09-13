/** @jsx jsx **/
import { css, jsx } from '@emotion/react'
import { Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'

import Loading from './Loading'

const Home = lazy(() => import('./Home'))
const Hot = lazy(() => import('./Hot'))
const History = lazy(() => import('./History'))
const Blog = lazy(() => import('./Blog'))
const NotFound = lazy(() => import('./NotFound'))

const Content = () => {
  return (
    <div
      css={css`
        margin-top: 6rem;
        /* background-color: white; */
        min-width: 960px;
        height: 100vh;
        font-size: 16px;
      `}
    >
      <Suspense fallback={<Loading />}>
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
          <Route path="/post/:id">
            <Blog />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </div>
  )
}

export default Content
