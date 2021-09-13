import qs from 'qs'

// 设置user信息
export const setUser = user => {
  localStorage.setItem('user', qs.stringify(user))
}

// 获取user信息
export const getUser = () => {
  return qs.parse(localStorage.getItem('user'))
}

// 设置token
export const setToken = token => {
  localStorage.setItem('token', token)
}

// 获取token
export const getToken = () => {
  return localStorage.getItem('token')
}

// 移除所有localStorage项
export const removeAll = () => {
  localStorage.clear()
}
