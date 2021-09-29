import Cookies from 'js-cookie'
import { User } from '../types/interfaces'

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
export const getUser = (): User => {
  return JSON.parse(localStorage.getItem('user') as string)
}

// 移除token 和 所有localStorage
export const removeAll = (): void => {
  Cookies.remove('token')
  localStorage.clear()
}
