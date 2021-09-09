import Cookies from 'js-cookie'

// 存放 token
export const setToken = token => {
  Cookies.set('token', token)
}

// 获取 token
export const getToken = () => {
  return Cookies.get('token')
}

// 移除 token
export const removeToken = () => {
  Cookies.remove('token')
}
