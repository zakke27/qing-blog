import { AxiosPromise } from 'axios'
import axiosInstance from '../utils/request'
import { LoginParams, NewComment, NewFollow } from '../types/interfaces'

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

/**
 * 新增评论
 * @param newComment 新建评论内容对象信息
 * @returns
 */
export const addComment = (newComment: NewComment) => {
  return axiosInstance({
    url: '/user/addComment',
    method: 'post',
    data: newComment
  })
}

/**
 * 获取当前用户的已关注列表
 * @param userid 用户id
 * @returns
 */
export const getFollowUserList = (userid: number) => {
  return axiosInstance({
    url: '/user/getFriendList',
    method: 'post',
    data: {
      userid
    }
  })
}

/**
 * 关注用户
 * @param newFollow 关注参数对象
 * @returns 
 */
export const followUser = (newFollow: NewFollow) => {
  return axiosInstance({
    url: '/user/getFriendList',
    method: 'post',
    data: newFollow
  })
}

/**
 * 取消关注用户
 * @param newFollow 关注参数对象
 * @returns 
 */
export const unFollowUser = (newFollow: NewFollow) => {
  return axiosInstance({
    url: '/user/getFriendList',
    method: 'post',
    data: newFollow
  })
}
