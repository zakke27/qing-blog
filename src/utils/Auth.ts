import Cookies from 'js-cookie'

interface User {
  id: number
  username: string
  name: string
  age: number
  gender: string | '男' | '女'
  role: number | 0 | 1
  avatar: string
  introduce: string
}

export const setToken = (token: string): void => {
  Cookies.set('token', token)
}

export const getToken = (): string | undefined => {
  return Cookies.get('token')
}

// 设置user信息
export const setUser = (user: User): void => {
  localStorage.setItem('user', JSON.stringify(user))
}

// 获取user信息
export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user') as string)
  } catch (error) {
    console.log('parsing error', error)
  }
}

// 移除token 和 所有localStorage
export const removeAll = (): void => {
  Cookies.remove('token')
  localStorage.clear()
}
