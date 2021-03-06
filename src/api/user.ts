import { AxiosPromise } from 'axios'
import axiosInstance from '../utils/request'
import {
  LoginParams,
  NewComment,
  NewFollow,
  NewUnFollow,
  UserProfileParams
} from '../types/interfaces'

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

/**
 * 获取用户已赞文章列表
 * @param userid 用户id
 * @returns
 */
export const getUserLiked = (userid: number): AxiosPromise => {
  return axiosInstance({
    url: '/user/getLikeArticle',
    method: 'post',
    data: {
      userid
    }
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
    url: '/user/addFriend',
    method: 'post',
    data: newFollow
  })
}

/**
 * 取消关注用户
 * @param newFollow 关注参数对象
 * @returns
 */
export const unFollowUser = (newUnFollow: NewUnFollow) => {
  return axiosInstance({
    url: '/user/deleteFriend',
    method: 'post',
    data: newUnFollow
  })
}

/**
 * 获取个人空间信息
 * @param userid 用户id
 * @returns
 */
export const getProfile = (userid: number) => {
  return axiosInstance({
    url: '/user/selectUserPersonalMessage',
    method: 'post',
    data: {
      userid
    }
  })
}

/**
 * 更新用户个人信息
 * @param user 更新用户个人信息对象参数
 * @returns
 */
export const updateProfile = (user: UserProfileParams) => {
  return axiosInstance({
    url: '/user/userPersonalMessage',
    method: 'post',
    data: user
  })
}
