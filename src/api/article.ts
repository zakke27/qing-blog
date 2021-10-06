import axios, { AxiosPromise } from 'axios'
import { NewArticleParams, UpdateArticleParams } from '../types/interfaces'
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
 * 获取热门文章列表/按文章热度降序获取所有文章
 * @returns
 */
export const getHotArticleList = () => {
  return axiosInstance({
    url: '/blog/getArticleByArticleHotDesc',
    method: 'get'
  })
}

/**
 * 根据文章id请求文章详细信息
 * @param articleid 文章id
 * @returns
 */
export const getArticleDetail = (articleid: number): AxiosPromise => {
  return axiosInstance({
    url: '/blog/getOneArticle',
    method: 'post',
    data: {
      articleid
    }
  })
}

/**
 * 用户给文章点赞
 * @param userid 用户id
 * @param articleid 文章id
 * @returns
 */
export const saveArticleLike = (userid: number, articleid: number): AxiosPromise => {
  return axiosInstance({
    url: '/article/like',
    method: 'post',
    data: {
      userid,
      articleid
    }
  })
}

/**
 * 用户取消点赞
 * @param userid 用户id
 * @param articleid 文章id
 * @returns
 */
export const cancelArticleLike = (userid: number, articleid: number): AxiosPromise => {
  return axiosInstance({
    url: '/article/dislike',
    method: 'post',
    data: {
      userid,
      articleid
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
 * 用户编辑文章
 * @param  newArticle 待更新文章对象
 * @returns
 */
export const updateArticle = (newArticle: UpdateArticleParams): AxiosPromise => {
  return axiosInstance({
    url: '/user/updateArticleByArticleId',
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
export const getCommentList = (articleid: number) => {
  return axiosInstance({
    url: '/user/selectCommentByArticleId',
    method: 'post',
    data: {
      articleid
    }
  })
}

/**
 * 模糊查询文章列表
 * @param title 模糊查询字段参数
 * @returns
 */
export const searchArticleList = (title: string) => {
  return axiosInstance({
    url: `/blog/getArticle?title=${title}`,
    method: 'get'
  })
}
