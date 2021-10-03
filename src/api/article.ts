import { AxiosPromise } from 'axios'
import { NewArticleParams } from '../types/interfaces'
import axiosInstance from '../utils/request'

/**
 * 分页请求首页文章列表
 * @param pages 页数
 * @returns
 */
export const getArticleList = (pages: number): AxiosPromise => {
  return axiosInstance({
    url: '/blog/getFirstPage',
    method: 'post',
    data: {
      pages
    }
  })
}

/**
 * 根据每篇文章id请求文章详细信息
 * @param aid 文章id
 * @returns
 */
export const getArticleDetail = (aid: number): AxiosPromise => {
  return axiosInstance({
    url: '/article/%7B%7B$natural%7D%7D',
    method: 'get'
  })
}

/**
 * 用户给文章点赞
 * @param aid 文章id
 * @param uid 用户id
 * @returns
 */
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

/**
 * 用户取消点赞
 * @param aid 文章id
 * @param uid 用户id
 * @returns
 */
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

/**
 * 用户新建文章
 * @param data 待新建文章对象
 * @returns
 */
export const addArticle = (newArticle: NewArticleParams): AxiosPromise => {
  return axiosInstance({
    url: '/user/addArticle',
    method: 'post',
    data: newArticle
  })
}

/**
 * 用户删除文章
 * @param articleid 文章id
 * @returns
 */
export const deleteArticle = (articleid: number): AxiosPromise => {
  return axiosInstance({
    url: '/user/delArticle',
    method: 'delete',
    data: {
      articleid
    }
  })
}

/**
 * 根据文章id获取此文章的评论列表
 * @param articleid 文章id
 * @returns
 */
export const getComment = (articleid: number) => {
  return axiosInstance({
    url: '/user/selectCommentByArticleId',
    method: 'post',
    data: {
      articleid
    }
  })
}
