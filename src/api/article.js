import request from '../utils/request'
// import qs from 'qs'

// 获取文章列表
export const getArticleList = () => {
  return request({
    url: '/articleList',
    method: 'GET'
  })
}

// 获取文章信息
export const getArticleInfoById = id => {
  return request({
    url: `/article/${id}`,
    method: 'GET'
  })
}

// 通过文章id给文章点赞 (算作是更新文章信息)
export const likeArticleById = id => {
  return request({
    url: `/article/${id}`,
    method: 'PUT'
  })
}
