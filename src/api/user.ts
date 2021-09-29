import { AxiosPromise } from 'axios'
import axiosInstance from '../utils/request'
import { LoginParams } from '../types/interfaces'

type RegisterParams = LoginParams

// 登录
export const login = (data: LoginParams): AxiosPromise => {
  return axiosInstance({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 注册
export const register = (data: RegisterParams): AxiosPromise => {
  return axiosInstance({
    url: '/user/register',
    method: 'post',
    data
  })
}

// 根据用户id查询已赞文章id数组
export const getUserLiked = (data: number): AxiosPromise => {
  return axiosInstance({
    url: '/user/liked',
    method: 'post',
    data
  })
}

// 根据用户id查询用户自己的文章
export const getPersonalArticles = (userid: number): AxiosPromise => {
  return axiosInstance({
    url: '/user/selectArticle',
    method: 'post',
    data: { userid }
  })
}
