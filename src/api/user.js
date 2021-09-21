import request from '../utils/request'
import qs from 'qs'

// 用户登录
export const userLogin = userInfo => {
  return request({
    url: '/user/login',
    method: 'POST',
    data: qs.stringify(userInfo)
  })
}

// 用户注册
export const userRegister = userInfo => {
  return request({
    url: '/user/register',
    method: 'POST',
    data: qs.stringify(userInfo)
  })
}

// 获取用户个人文章列表 by userId
export const getUserArticleByUid = uid => {
  return request({
    url: '/user/article',
    method: 'GET',
    data: uid
  })
}

// 获取用户点赞文章列表 by userId
export const getUserLikeArticleByUid = uid => {
  return request({
    url: '/user/likeArticle',
    method: 'GET',
    data: uid
  })
}
