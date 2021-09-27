import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { getUser } from '../utils/Auth'

interface Props extends RouteProps {
  roles: number[] // 0为管理员页面； 1为登录用户页面
}

const AuthRoute = (props: Props) => {
  const { children, roles, ...rest } = props
  return (
    <Route
      {...rest}
      render={({ history }): any =>
        roles.includes(getUser()?.role) ? children : history.goBack()
      }
    />
  )
}

export default AuthRoute
