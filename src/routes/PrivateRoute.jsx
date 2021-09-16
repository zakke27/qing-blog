import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { getToken } from '../utils/Auth'
import PropTypes from 'prop-types'

const PrivateRoute = props => {
  const { component: Component, ...rest } = props
  const token = getToken()
  return <Route {...rest}>{token ? <Component /> : <Redirect to="/" />}</Route>
}

PrivateRoute.propTypes = {
  component: PropTypes.object
}

export default PrivateRoute
