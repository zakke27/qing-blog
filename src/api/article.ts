import axios, { AxiosPromise, AxiosResponse } from 'axios'
import axiosInstance from './api'

// 首页请求文章列表
export const getArticleList = (): Promise<AxiosResponse> => {
  return axiosInstance.get('/articleList')
}

// 根据每篇文章id请求文章详细信息
export const getArticleDetailById = (aid: string): AxiosPromise => {
  return axiosInstance({
    url: '/article/%7B%7B$natural%7D%7D',
    method: 'get'
  })
}

// 点赞文章
export const saveArticleLike = (aid: string, uid: string): AxiosPromise => {
  return axiosInstance({
    url: '/article/save',
    method: 'post',
    params: {
      aid,
      uid
    }
  })
}

// 取消点赞文章
export const cancelArticleLike = (aid: string, uid: string): AxiosPromise => {
  return axiosInstance({
    url: '/article/cancel',
    method: 'post',
    params: {
      aid,
      uid
    }
  })
}
