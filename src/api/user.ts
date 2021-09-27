import { AxiosPromise } from 'axios'
import axiosInstance, { HttpResponse } from './api'

export interface ILoginParams {
  username: string
  password: string
}

export interface IRegisterParams {
  username: string
  password: string
  confirm: string
}

// 登录
export const login = (params: ILoginParams): Promise<HttpResponse> => {
  return axiosInstance.post('/user/login', params)
}

// 注册
export const register = (params: IRegisterParams): Promise<HttpResponse> => {
  return axiosInstance.post('/user/register', params)
}

// 根据用户id查询已赞文章id数组
export const getUserLikedById = (id: string | number): Promise<HttpResponse> => {
  return axiosInstance.get('/user/liked/%7B%7B$natural%7D%7D')
}

// 根据用户id查询用户写过的文章

export const getPersonalArticles = (uid: string | number): AxiosPromise => {
  return axiosInstance({
    url: '/user/articles',
    method: 'get'
  })
}
