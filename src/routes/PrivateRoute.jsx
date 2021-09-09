import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { getToken } from '../utils/Auth'
import PropTypes from 'prop-types'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = getToken()
  return <Route {...rest}>{token ? <Component /> : <Redirect to="/login" />}</Route>
}

PrivateRoute.propTypes = {
  component: PropTypes.func
}

export default PrivateRoute
