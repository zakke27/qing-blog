// import Cookies from 'js-cookie'

// 存放 token
export const setToken = token => {
  localStorage.setItem('token', token)
}

// 获取 token
export const getToken = () => {
  return localStorage.getItem('token')
}

// 移除 token
export const removeToken = () => {
  localStorage.removeItem('token')
}
