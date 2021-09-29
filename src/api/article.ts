import { AxiosPromise } from 'axios'
import { NewArticleParams } from '../types/interfaces'
import axiosInstance from '../utils/request'

// 首页请求文章列表
export const getArticleList = (): AxiosPromise => {
  return axiosInstance.get('/articleList')
}

// 根据每篇文章id请求文章详细信息
export const getArticleDetail = (aid: number): AxiosPromise => {
  return axiosInstance({
    url: '/article/%7B%7B$natural%7D%7D',
    method: 'get'
  })
}

// 点赞文章
export const saveArticleLike = (aid: number, uid: number): AxiosPromise => {
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
export const cancelArticleLike = (aid: number, uid: number): AxiosPromise => {
  return axiosInstance({
    url: '/article/cancel',
    method: 'post',
    params: {
      aid,
      uid
    }
  })
}

// 新增文章
export const addArticle = (data: NewArticleParams): AxiosPromise => {
  return axiosInstance({
    url: '/user/addArticle',
    method: 'post',
    data
  })
}

// 删除文章
export const deleteArticle = (articleid: number): AxiosPromise => {
  return axiosInstance({
    url: '/user/delArticle',
    method: 'delete',
    data: {
      articleid
    }
  })
}
